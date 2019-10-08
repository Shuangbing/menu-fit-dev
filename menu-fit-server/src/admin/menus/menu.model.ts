import { getModelForClass, prop } from '@hasezoey/typegoose';

export class Menu {
    @prop()
    title: string;
    @prop()
    price: string;
    @prop()
    allergies: string[];
    @prop()
    options: [{
        title: string;
        price: string;
    }];
}

export const MenuModel = getModelForClass(Menu);
