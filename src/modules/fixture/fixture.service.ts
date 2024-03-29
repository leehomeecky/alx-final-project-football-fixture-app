import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Fixture, FixtureStatus, MatchType } from 'src/schema/fixture.schema';
import { CreateFixtureDto, UpdateFixtureDto } from './fixture.dto';
import { DEFAULT_LIMIT } from 'src/utils/constant';
import * as moment from 'moment';
import { TeamService } from '../team/team.service';
import { Link } from 'src/schema/link.schema';
import { generateUniqueString } from 'src/utils/link.util';

@Injectable()
export class FixtureService {
  private readonly logger = new Logger(FixtureService.name);

  constructor(
    @InjectModel(Fixture.name)
    private fixtureModel: mongoose.Model<Fixture>,
    @InjectModel(Link.name)
    private linkModel: mongoose.Model<Link>,
    private teamService: TeamService,
  ) {}

  async createFixture(data: CreateFixtureDto) {
    const { homeTeamId: homeTeam, awayTeamId: awayTeam } = data;

    if (!mongoose.isValidObjectId(homeTeam))
      throw new BadRequestException(null, 'homeTeamId is not a valid id');
    if (!mongoose.isValidObjectId(awayTeam))
      throw new BadRequestException(null, 'awayTeamId is not a valid id');
    if (awayTeam === homeTeam)
      throw new BadRequestException(
        null,
        'homeTeamId and awayTeamId can not be the same',
      );

    try {
      await this.teamService.getTeam(homeTeam);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(null, 'homeTeamId dose not exist');
    }

    try {
      await this.teamService.getTeam(awayTeam);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(null, 'awayTeamId dose not exist');
    }

    await this.fixtureModel.create({ ...data, homeTeam, awayTeam });
  }

  async getAllFixtures(filter) {
    const { startDate, endDate, status, referee, matchType, limit, skip } =
      filter;

    try {
      const allFixturesQuery = this.fixtureModel
        .find()
        .populate({
          path: 'homeTeam',
          select: ['teamName', 'teamCode', 'stadium', 'coach', 'logo'],
        })
        .populate({
          path: 'awayTeam',
          select: ['teamName', 'teamCode', 'coach', 'logo'],
        })
        .limit(limit ?? DEFAULT_LIMIT)
        .skip(skip ?? 0)
        .where('deletedAt')
        .equals(null);

      const fixtureCountQuery = this.fixtureModel
        .count()
        .where('deletedAt')
        .equals(null);

      startDate
        ? allFixturesQuery.where('matchDate').gte(moment(startDate).unix())
        : null;
      endDate
        ? allFixturesQuery.where('matchDate').lte(moment(endDate).unix())
        : null;
      status ? allFixturesQuery.where('status').equals(status) : null;
      referee ? allFixturesQuery.where('referee').equals(referee) : null;
      matchType ? allFixturesQuery.where('matchType').equals(matchType) : null;

      const [fixtures, fixturesCount] = await Promise.all([
        allFixturesQuery.sort({ matchDate: -1 }).exec(),
        fixtureCountQuery.exec(),
      ]);

      return {
        fixtures,
        meta: {
          skip: +skip || 0,
          limit: +limit || DEFAULT_LIMIT,
          count: fixturesCount,
        },
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(null, 'error occured');
    }
  }

  async getFixture(id): Promise<Fixture> {
    if (!mongoose.isValidObjectId(id))
      throw new NotAcceptableException(null, 'Id is not valid');

    const fixtures = await this.fixtureModel
      .findById(id)
      .populate('homeTeam')
      .populate('awayTeam')
      .where('deletedAt')
      .equals(null)
      .exec();

    if (!fixtures) throw new NotFoundException(null, 'Record Not Found');

    return fixtures;
  }

  async updateFixture(data: UpdateFixtureDto) {
    const { id, homeTeamId, awayTeamId } = data;

    try {
      if (homeTeamId) await this.teamService.getTeam(homeTeamId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(null, 'homeTeamId dose not exist');
    }

    try {
      if (awayTeamId) await this.teamService.getTeam(awayTeamId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(null, 'awayTeamId dose not exist');
    }

    const team = await this.getFixture(id);

    await this.fixtureModel.updateOne({ _id: id }, data);
  }

  async deleteFixture(id) {
    const team = await this.getFixture(id);

    await this.fixtureModel.updateOne(
      { _id: id },
      { deleted: true, deletedAt: moment().format() },
    );
  }

  async createLink(data: { fixtureId: string }) {
    const { fixtureId: fixture } = data;

    if (!mongoose.isValidObjectId(fixture))
      throw new NotAcceptableException(null, 'fixtureId is not valid');

    try {
      await this.getFixture(fixture);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(null, 'fixtureId dose not exist');
    }

    try {
      const uniqueString = generateUniqueString(10);
      await this.linkModel.create({
        fixture,
        linkId: uniqueString,
      });

      return {
        linkId: uniqueString,
        link: `${process.env.ENV_URI}/fixture/link/${uniqueString}`,
      };
    } catch (e) {
      this.logger.warn(e);
      throw new InternalServerErrorException(
        null,
        'error occured, pls try again',
      );
    }
  }

  async processLink(linkId) {
    const linkData = await this.linkModel
      .findOne({ linkId })
      .where('deletedAt')
      .equals(null)
      .exec();

    if (!linkData) throw new NotFoundException(null, 'invalid link');

    const fixture = await this.getFixture(linkData.fixture);
    return fixture;
  }
}
