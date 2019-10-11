import { prop } from '@typegoose/typegoose';

export class User {
    @prop()
    openID: string;
    @prop()
    profile: {
        name: string,
        picture: string,
        email: string,
        access_token: string,
        refresh_token: string,
    };
    
}
