import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Admin {
  @prop()
  username: string;
  @prop()
  password: string;
}
