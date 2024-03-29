import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import { Team } from './team.schema';
import { FixtureStatus, MatchType } from 'src/enum/fixture.enum';

export type FixtureDocument = HydratedDocument<Fixture>;

@Schema()
export class Fixture {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Team' })
  homeTeam: Team;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Team' })
  awayTeam: Team;

  @Prop({ required: true, enum: FixtureStatus, default: FixtureStatus.PENDING })
  status: FixtureStatus;

  @Prop({ default: 0 })
  homeTeamScore: number;

  @Prop({ default: 0 })
  awayTeamScore: number;

  @Prop({ required: true })
  referee: string;

  @Prop({ required: true, enum: MatchType })
  matchType: MatchType;

  @Prop({ required: true, type: Date })
  matchDate: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: Boolean;
}

export const FixtureSchema = SchemaFactory.createForClass(Fixture);
