import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import { Role } from 'src/enum/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: null })
  adminHash: string;

  @Prop({ required: true, enum: Role })
  role: Role;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
