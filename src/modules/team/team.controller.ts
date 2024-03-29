import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { TeamService } from './team.service';
import { UserGuard } from 'src/guards/user.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';
import { imageFileFilter } from 'src/utils/multer.utils';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(AdminGuard)
  @Post('/')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: MulterConfig.storage,
      fileFilter: imageFileFilter,
    }),
  )
  async createTeams(
    @Req() req: Request,
    @Res() resp,
    @Body() body: CreateTeamDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (!logo || !logo?.filename)
      throw new BadRequestException(null, 'logo must be attached');

    body.logo = logo.filename;

    await this.teamService.createTeams(body);

    return resp.json({
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(UserGuard)
  @Get('/')
  @UseInterceptors(CacheInterceptor)
  async getAllTeams(@Req() req: Request, @Res() resp) {
    const teams = await this.teamService.getAllTeams();

    return resp.json({
      teams,
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(UserGuard)
  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async getTeam(@Req() req: Request, @Res() resp) {
    const { id } = req.params;
    const team = await this.teamService.getTeam(id);

    return resp.json({
      team,
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(AdminGuard)
  @Put('/')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: MulterConfig.storage,
      fileFilter: imageFileFilter,
    }),
  )
  async updateTeams(
    @Req() req: Request,
    @Res() resp,
    @Body() body: UpdateTeamDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (logo || logo?.filename) body.logo = logo.filename;

    await this.teamService.updateTeam(body);

    return resp.json({
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteTeam(@Req() req: Request, @Res() resp) {
    const { id } = req.params;
    const team = await this.teamService.deleteTeam(id);

    return resp.json({
      code: 0,
      message: 'Operation successful',
    });
  }
}
