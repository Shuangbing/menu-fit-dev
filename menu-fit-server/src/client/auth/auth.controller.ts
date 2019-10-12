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
    ) { }

    @Get('login')
    Login(@Query('table') table: string, @Response() response: express.Response) {
        if (table !== undefined) {
            return response.redirect(this.authService.auth(table));
        } else {
            return response.redirect(this.authService.auth(null));
        }
    }

    @Get('callback')
    CallBack(
        @Response() response: express.Response,
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('table') table: string,
        @Query('access_token') accessToken: string) {

        if (code !== undefined && state !== undefined && table !== undefined) {
            this.authService.getAcccessToken(code, state, table);
            return response.redirect('/go/' + table);
        } else if (accessToken !== undefined) {
            return 'to Get Profile Information';
        }

        return false;
    }
}
