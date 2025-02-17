import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if (!authorization) throw new UnauthorizedException('Token is required');
    try { 
      const payload = this.jwtService.verify(authorization, 
        { secret: process.env.SECRET_KEY }
      );
      request.user = payload;
    } catch (error) {       
      throw new UnauthorizedException('Invalid token');
    }   
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request);
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}


