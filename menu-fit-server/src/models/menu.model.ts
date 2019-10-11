import { prop, Ref } from '@typegoose/typegoose';
import { Category } from './category.model';

export class Menu {
    @prop()
    title: string;
    @prop()
    price: string;
    @prop()
    summary: string;
    @prop({ ref: Category })
    category: Ref<Category>;
    @prop({ default: '' })
    picture: string;
    @prop()
    allergies: string[];
    @prop()
    options: [{
        title: string;
        price: string;
    }];
}
