import { getModelForClass, prop, Ref } from '@hasezoey/typegoose';
import { User } from '../users/user.model';

export class Order {
    @prop({ ref: User })
    users: [Ref<User>];
    @prop()
    detail: [{
        menu: string,
        price: number,
        amount: number,
    }];
}

export const OrderModel = getModelForClass(Order);
