import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { User } from './user.model';
import { Menu } from './menu.model';
import { Table } from './table.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class Order {
    @prop({ ref: User })
    user: Ref<User>;
    @prop({ ref: Table })
    table: Ref<Table>;
    @prop()
    total: number;
    @prop()
    payment: string;
    @prop()
    status: number;　// status: 支払状態 0:支払待ち 1:支払キャンセル 2:支払完了
    @prop()
    transactionId: string;
    @prop()
    detail: [{
        menu: Ref<Menu>,
        amount: number,
        total: number;
    }];
}
