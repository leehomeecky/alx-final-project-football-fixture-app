import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Team } from 'src/schema/team.schema';
import { CreateTeamDto, UpdateTeamDto } from '../../dto/team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { unlink } from 'fs';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);
  constructor(
    @InjectModel(Team.name)
    private teamModel: mongoose.Model<Team>,
  ) {}

  async createTeams(data: CreateTeamDto) {
    await this.teamModel.create(data);
  }

  async getAllTeams(): Promise<Team[]> {
    const allTeams = await this.teamModel
      .find()
      .where('deletedAt')
      .equals(null)
      .sort({ teamName: 1 })
      .exec();

    return allTeams;
  }

  async getTeam(id): Promise<Team> {
    if (!mongoose.isValidObjectId(id))
      throw new NotAcceptableException(null, 'Id is not valid');

    const team = await this.teamModel
      .findById(id)
      .where('deletedAt')
      .equals(null)
      .exec();

    if (!team) throw new NotFoundException(null, 'Record Not Found');

    return team;
  }

  async updateTeam(data: UpdateTeamDto) {
    const { id } = data;

    const team = await this.getTeam(id);

    await this.teamModel.updateOne({ _id: id }, data);
  }

  async deleteTeam(id) {
    const team = await this.getTeam(id);

    unlink(`src/assets/uploads/${team.logo}`, (err) => {
      if (err)
        throw new InternalServerErrorException(null, 'logo delete failed');
    });

    await this.teamModel.deleteOne({ _id: id });
  }
}
