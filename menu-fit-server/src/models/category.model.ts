import { prop } from '@typegoose/typegoose';

export class Category {
    @prop()
    title: string;
}
