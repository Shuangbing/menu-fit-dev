import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/users')
@UseGuards(AuthGuard('admin'))
@ApiUseTags('ユーザー')
export class UsersController {
  constructor(@InjectModel(User) private readonly userModel) {}

  @Get()
  @ApiOperation({ title: 'ユーザーリストを表示する' })
  async index() {
    return await this.userModel.find();
  }
}
