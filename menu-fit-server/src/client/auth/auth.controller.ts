import { Controller, Get, Response, Param, Query } from '@nestjs/common';
import { LineService } from './line/line.service';
import * as express from 'express';
import { JwtModule } from '@nestjs/jwt';

const lineService = new LineService();

@Controller('client/auth')
export class AuthController {
    @Get('login')
    Login(@Response() response: express.Response) {
        return response.redirect(lineService.login());
    }

    @Get('callback')
    CallBack(
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('access_token') accessToken: string) {

        if (code !== undefined && state !== undefined) {
            lineService.getAcccessToken(code, state);
            
            return 'to Get AccessToken';
        } else if (accessToken !== undefined) {
            return 'to Get Profile Information';
        }

        return false;
    }
}
