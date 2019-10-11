import { prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { Menu } from './menu.model';
import { Table } from './table.model';

export class Order {
    @prop({ ref: User })
    users: [Ref<User>];
    @prop({ ref: Table })
    table: Ref<User>;
    @prop()
    amount: number;
    @prop()
    payment: string;
    @prop()
    status: number;　// status: 支払状態 0:支払待ち 1:支払キャンセル 2:支払完了
    @prop()
    detail: [{
        menu: Ref<Menu>,
        price: number,
        amount: number,
    }];
}
