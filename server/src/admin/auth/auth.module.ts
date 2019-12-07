import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Admin } from '../../models/admin.model';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.SECRET_KEY,
            }),
        }),
        TypegooseModule.forFeature([Admin]),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, AuthService],
})
export class AuthAdminModule { }
