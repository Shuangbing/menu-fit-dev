import { getModelForClass, prop, Ref } from '@hasezoey/typegoose';
import { User } from '../users/user.model';
import { Menu } from '../menus/menu.model';
import { Table } from '../tables/table.model';

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

export const OrderModel = getModelForClass(Order);
