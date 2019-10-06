import { getModelForClass, prop } from '@hasezoey/typegoose';

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

export const UserModel = getModelForClass(User);
