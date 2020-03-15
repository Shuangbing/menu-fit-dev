import { Injectable } from '@nestjs/common';

const version = process.env.npm_package_version;

@Injectable()
export class AppService {
  welcomeMessage(): any {
    return { message: `MENU.Fit API v${version}`, timestamp: Date.now() };
  }
}
