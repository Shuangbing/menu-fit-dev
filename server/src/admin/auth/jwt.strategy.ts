import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  HttpException,
  Req,
} from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('もう一度ログインしてください', 401);
    }
    return user;
  }
}
