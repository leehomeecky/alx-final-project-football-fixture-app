import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import { Fixture } from './fixture.schema';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Fixture' })
  fixture: Fixture;

  @Prop({ required: true, unique: true })
  linkId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: Boolean;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
