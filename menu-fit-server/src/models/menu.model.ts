import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { Category } from './category.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

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
