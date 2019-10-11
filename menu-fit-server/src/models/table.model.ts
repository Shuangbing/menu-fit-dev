import { prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

export class Table {
    @prop()
    tableNo: string;
    @prop({ ref: User })
    user: Ref<User>;
}
