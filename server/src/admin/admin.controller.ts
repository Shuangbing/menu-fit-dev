import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as dotenv from 'dotenv';

dotenv.config();
AWS.config.update({
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    accessKeyId: process.env.AWS_ACCESSKEYID,
    sessionToken: process.env.AWS_SESSIONTOKEN,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

@Controller('admin')
export class AdminController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: multerS3(
            {
                s3: s3,
                bucket: process.env.AWS_S3_BUCKET,
                acl: 'public-read',
            },
        ),
    }))
    uploadFile(@UploadedFile() file) {
        return file;
    }

}
