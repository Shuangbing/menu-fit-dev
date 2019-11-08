import { Controller, Get, Response, Param, Query, HttpException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('client/auth')
@ApiUseTags('client-認証')
export class AuthController {
    constructor(
        @InjectModel(User) private readonly userModel,
        private readonly authService: AuthService,
    ) { }

    @Get('login')
    @ApiOperation({ title: 'ログイン' })
    async Login(@Query('tableID') tableID: string) {
        if (tableID !== undefined) {
            return await this.authService.auth(tableID);
        } else {
            return await this.authService.auth(null);
        }
    }

    @Get('callback')
    @ApiOperation({ title: 'ログイン呼び出し認証' })
    async CallBack(
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('table') table: string) {

        if (code !== undefined && state !== undefined && table !== undefined) {
            const userToken = await this.authService.getAcccessToken(code, state, table);
            if (userToken) {
                return {
                    access_token: userToken,
                };
            }
        } else {
            throw new HttpException('ログインできませんでした', 403);
        }

        return false;
    }
}
