import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel} from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



@Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
}

@UseGuards(AuthGuard) 
@Get(':id')
async getUser(@Param('id') id: string): Promise<UserModel | null> {
  const user = this.userService.user({id: Number(id)});
   
  if (!user) {
    throw new Error('User not found');
  }
  return user;

}

@UseGuards(AuthGuard) 
@Put()
async updateUser(
  @Body() userData: Prisma.UserUpdateInput,
  @Param('id') id: string,
): Promise<UserModel> {
  return this.userService.updateUser({
    where: {id: Number(id)},
    data: userData});
}

@UseGuards(AuthGuard) 
@Delete(':id')
async deleteUser(@Param('id') id: string): Promise<UserModel> {
  return this.userService.deleteUser({id: Number(id)});
}


}
