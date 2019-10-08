import { Injectable } from '@nestjs/common';
import unirest = require('unirest');
import * as jwt from 'jsonwebtoken';
import { UserModel, User } from '../../../admin/users/user.model';

@Injectable()
export class LineService {

    SCOPE = 'openid profile';
    PROMPT = 'consent';
    BOT_PROMPT: 'normal';

    login() {
        return 'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id='
            + process.env.CHANNEL_ID
            + '&redirect_uri=' + encodeURIComponent(process.env.CALLBACK_URL)
            + '&state=stateTest&scope=openid%20profile&nonce=nonceTest';
    }

    getAcccessToken(code: string, state: string) {
        const req = unirest('POST', 'https://api.line.me/oauth2/v2.1/token');

        req.headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        req.form({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.CALLBACK_URL,
            client_id: process.env.CHANNEL_ID,
            client_secret: process.env.CHANNEL_SECRET,
        });

        // tslint:disable-next-line: only-arrow-functions
        req.end((res) => {
            if (res.error) { return false; }
            if (res.body.access_token && res.body.id_token) {
                const userInfo = jwt.decode(res.body.id_token);
                UserModel.findOne({ openID: userInfo.sub }, (error, doc) => {
                    if (doc == null) {
                        const user = {
                            openID: userInfo['sub'],
                            profile: {
                                access_token: res.body.access_token,
                                refresh_token: res.body.refresh_token,
                                name: userInfo['name'],
                                picture: userInfo['picture'],
                            },
                        };
                        UserModel.create(user);
                        return true;
                    } else {
                        const { id } = doc;
                        const profile = {
                            access_token: res.body.access_token,
                            refresh_token: res.body.refresh_token,
                            name: userInfo['name'],
                            picture: userInfo['picture'],
                        };
                        UserModel.findByIdAndUpdate(id, { profile: profile });
                        return true;
                    }
                });
            }
        });

    }
}
