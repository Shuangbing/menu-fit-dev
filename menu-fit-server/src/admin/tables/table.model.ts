import { getModelForClass, prop, Ref } from '@hasezoey/typegoose';
import { User } from '../users/user.model';

export class Table {
    @prop()
    tableNo: string;
    @prop({ ref: User })
    user: Ref<User>;
}

export const TableModel = getModelForClass(Table);
