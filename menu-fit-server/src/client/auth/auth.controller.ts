import { Controller, Get, Response, Param, Query, Global } from '@nestjs/common';
import * as express from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('client/auth')
@ApiUseTags('認証')
export class AuthController {
    constructor(
        @InjectModel(User) private readonly userModel,
        private readonly authService: AuthService,
    ) {}
    
    @Get('login')
    Login(@Response() response: express.Response) {
        return response.redirect(this.authService.auth(null));
    }

    @Get('callback')
    CallBack(
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('access_token') accessToken: string) {

        if (code !== undefined && state !== undefined) {
            this.authService.getAcccessToken(code, state, null);
            
            return 'to Get AccessToken';
        } else if (accessToken !== undefined) {
            return 'to Get Profile Information';
        }

        return false;
    }
}
