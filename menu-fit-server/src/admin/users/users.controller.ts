import { Controller, Get } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';

@Controller('admin/users')
@ApiUseTags('ユーザー')
export class UsersController {
    constructor(
        @InjectModel(User) private readonly userModel,
    ) {}

    @Get()
    @ApiOperation({ title: 'ユーザーリストを表示する' })
    async index() {
        return await this.userModel.find();
    }
    
}
