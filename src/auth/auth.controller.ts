import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('signin')
@HttpCode(HttpStatus.OK)
signIn(@Body() body: Prisma.UserCreateInput){
  return this.authService.singin(body);
  
  }

}
