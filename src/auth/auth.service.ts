import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService
   ) {}
  
  
  
  async singin(params: Prisma.UserCreateInput){
    const user = await this.userService.user({email: params.email});
    if(!user){
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if(!passwordMatch){
      throw new UnauthorizedException('Invalid password');
    }
    
    const payload = { sub: user.id};

     return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

}
