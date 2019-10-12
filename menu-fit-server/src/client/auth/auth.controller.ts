import { Controller, Get, Response, Param, Query, Global } from '@nestjs/common';
import { LineService } from './line/line.service';
import * as express from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { ApiUseTags } from '@nestjs/swagger';

const lineService = new LineService(null);

@Controller('client/auth')
@ApiUseTags('認証')
export class AuthController {
    constructor(
        @InjectModel(User) private readonly userModel,
    ) {}
    
    @Get('login')
    Login(@Response() response: express.Response) {
        return response.redirect(lineService.login(null));
    }

    @Get('test1')
    test1() {
        return true;
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
