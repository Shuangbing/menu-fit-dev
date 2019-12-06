import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { User } from './user.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class Table {
    @prop()
    tableNo: string;
    @prop({ ref: User })
    user: Ref<User>;
    @prop({ default: false })
    smoking: boolean;
}
