import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

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
