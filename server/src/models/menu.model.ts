import { prop, Ref, modelOptions, arrayProp } from '@typegoose/typegoose';
import { Category } from './category.model';
import { Allergy } from './allergy.model';

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
  @prop({ default: 3 })
  max: number;
  @prop()
  summary: string;
  @prop({ ref: Category })
  category: Ref<Category>;
  @prop({ default: '' })
  picture: string;
  @arrayProp({ itemsRef: Allergy })
  allergies: Ref<Allergy>[];
  @prop()
  options: [
    {
      title: string;
      price: string;
    },
  ];
}
