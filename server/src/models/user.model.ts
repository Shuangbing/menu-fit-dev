import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { Allergy } from './allergy.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class User {
    @prop()
    openID: string;
    @arrayProp({itemsRef: Allergy})
    allergies: Ref<Allergy>[];
    @prop()
    profile: {
        first_auth: boolean,
        name: string,
        picture: string,
        email: string,
        access_token: string,
        refresh_token: string,
    };
    
}
