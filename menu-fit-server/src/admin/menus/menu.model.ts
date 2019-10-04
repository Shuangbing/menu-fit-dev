import { getModelForClass, prop } from '@hasezoey/typegoose';

class MenuOption {
    @prop()
    title: string;
    @prop()
    price: string;
}

export class Menu {
    @prop()
    title: string;
    @prop()
    price: string;
    @prop()
    option: MenuOption[];
}

export const MenuModel = getModelForClass(Menu);
