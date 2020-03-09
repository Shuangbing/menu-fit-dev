import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { ApiModelProperty, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Admin } from '../../models/admin.model';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';

class UserDto {
  @ApiModelProperty({ description: 'アカウント', example: 'user1' })
  @IsNotEmpty({ message: 'アカウントを入力してください' })
  username: string;
  @ApiModelProperty({ description: 'パスワード', example: 'password1' })
  @IsNotEmpty({ message: 'パスワードを入力してください' })
  password: number;
}

@Controller('admin/auth')
@ApiUseTags('認証')
export class AuthController {
  constructor(
    @InjectModel(Admin) private readonly adminModel,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ title: 'ログイン' })
  async login(@Body() loginDto: UserDto) {
    const user = await this.adminModel.findOne({ username: loginDto.username });
    if (user && bcrypt.compareSync(loginDto.password, user.password)) {
      return { access_token: await this.authService.signIn(user._id) };
    }
    throw new HttpException('認証できませんでした', 403);
  }

  @Post('register')
  @ApiOperation({ title: '新規登録 (本番環境は削除してください' })
  async register(@Body() registerDto: UserDto) {
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const user = await this.adminModel.findOne({
      username: registerDto.username,
    });
    if (!user) {
      return { user: await this.adminModel.create(registerDto) };
    }
    throw new HttpException('既に存在しているアカウントです', 403);
  }
}
