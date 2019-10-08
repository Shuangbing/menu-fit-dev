import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin')
export class AdminController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { dest: 'public/uploads/' }))
    uploadFile(@UploadedFile() file) {
        return file;
    }

}
