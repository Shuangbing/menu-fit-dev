import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Admin } from '../../models/admin.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Admin) private readonly adminModel,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(id: string): Promise<string> {
        const user = { uid: id };
        return this.jwtService.sign(user);
    }

    async validateUser(payload): Promise<any> {
        return await this.adminModel.findById(payload.uid);
    }

}
