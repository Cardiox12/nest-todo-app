import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log(jwtConstants.secret);
@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtService],
  exports: [AuthService]
})
export class AuthModule {}
