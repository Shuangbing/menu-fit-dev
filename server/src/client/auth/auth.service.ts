import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import axios = require('axios');
import qs = require('qs');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
  ) {}
  SCOPE = 'openid profile';
  PROMPT = 'consent';
  BOT_PROMPT: 'normal';

  async signIn(userId: string): Promise<string> {
    const user = { userId: userId };
    return this.jwtService.sign(user);
  }

  async validateUser(payload): Promise<any> {
    if (!payload) {
      throw new HttpException('もう一度ログインしてください', 401);
    }
    return await this.userModel.findById(payload.userId);
  }

  async auth(table: string) {
    return (
      'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=' +
      process.env.LINE_CHANNEL_ID +
      '&redirect_uri=' +
      encodeURIComponent(process.env.LINE_CALLBACK_URL + '?table=' + table) +
      '&state=stateTest&scope=openid%20profile&nonce=nonceTest'
    );
  }

  async getAcccessToken(code: string, state: string, table: string) {
    const tokenPost = await axios.default
      .post(
        'https://api.line.me/oauth2/v2.1/token',
        qs.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: process.env.LINE_CALLBACK_URL + '?table=' + table,
          client_id: process.env.LINE_CHANNEL_ID,
          client_secret: process.env.LINE_CHANNEL_SECRET,
        }),
      )
      .catch(error => {
        throw new HttpException('認証できませんでした', 401);
      });

    if (tokenPost.data.access_token && tokenPost.data.id_token) {
      const userInfo = jwt.decode(tokenPost.data.id_token);
      const user = await this.userModel.findOne({ openID: userInfo.sub });
      if (user) {
        const profile = {
          first_auth: false,
          access_token: tokenPost.data.access_token,
          refresh_token: tokenPost.data.refresh_token,
          name: userInfo['name'],
          picture: userInfo['picture'],
        };
        this.userModel.findByIdAndUpdate(user._id, { profile: profile });
        return this.signIn(user._id);
      } else {
        const userCreate = await this.userModel.create({
          openID: userInfo['sub'],
          profile: {
            first_auth: true,
            access_token: tokenPost.data.access_token,
            refresh_token: tokenPost.data.refresh_token,
            name: userInfo['name'],
            picture: userInfo['picture'],
          },
        });
        return this.signIn(userCreate._id);
      }
    } else {
      return false;
    }
  }
}
