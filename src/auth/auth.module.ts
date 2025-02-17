import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [forwardRef(()=> UserModule),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY || '',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
