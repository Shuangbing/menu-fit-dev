import { Controller, Get } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { UserModel } from './user.model';

@Controller('admin/users')
@ApiUseTags('ユーザー')
export class UsersController {

    @Get()
    @ApiOperation({ title: 'ユーザーリストを表示する' })
    async index() {
        return await UserModel.find();
    }
    
}
