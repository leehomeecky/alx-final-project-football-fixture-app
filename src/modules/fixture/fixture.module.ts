import { Module } from '@nestjs/common';
import { FixtureController } from './fixture.controller';
import { FixtureService } from './fixture.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FixtureSchema } from 'src/schema/fixture.schema';
import { TeamService } from '../team/team.service';
import { TeamSchema } from 'src/schema/team.schema';
import { LinkSchema } from 'src/schema/link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Fixture', schema: FixtureSchema },
      { name: 'Team', schema: TeamSchema },
      { name: 'Link', schema: LinkSchema },
    ]),
  ],
  controllers: [FixtureController],
  providers: [FixtureService, TeamService],
})
export class FixtureModule {}
