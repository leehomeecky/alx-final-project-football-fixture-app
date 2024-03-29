import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { AdminGuard } from 'src/guards/admin.guard';
import {
  CreateFixtureDto,
  FixtureFilterDto,
  UpdateFixtureDto,
} from '../../dto/fixture.dto';
import { UserGuard } from 'src/guards/user.guard';
import { Request } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('fixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @UseGuards(AdminGuard)
  @Post('/')
  async createFixture(
    @Req() req: Request,
    @Res() resp,
    @Body() body: CreateFixtureDto,
  ) {
    await this.fixtureService.createFixture(body);

    return resp.json({
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(UserGuard)
  @Get('/')
  @UseInterceptors(CacheInterceptor)
  async getAllFixtures(
    @Req() req: Request<null, null, null, FixtureFilterDto>,
    @Res() resp,
  ) {
    const filter = req.query;
    const fixtures = await this.fixtureService.getAllFixtures(filter);

    return resp.json({
      ...fixtures,
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(UserGuard)
  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async getFixture(@Req() req: Request, @Res() resp) {
    const { id } = req.params;
    const team = await this.fixtureService.getFixture(id);

    return resp.json({
      team,
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(AdminGuard)
  @Put('/')
  async updateFixture(
    @Req() req: Request,
    @Res() resp,
    @Body() body: UpdateFixtureDto,
  ) {
    await this.fixtureService.updateFixture(body);

    return resp.json({
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteFixture(@Req() req: Request, @Res() resp) {
    const { id } = req.params;
    const team = await this.fixtureService.deleteFixture(id);

    return resp.json({
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(AdminGuard)
  @Post('/link')
  async createLink(
    @Req() req: Request,
    @Res() resp,
    @Body() body: { fixtureId: string },
  ) {
    const result = await this.fixtureService.createLink(body);

    return resp.json({
      ...result,
      code: 0,
      message: 'Operation successful',
    });
  }

  @UseGuards(UserGuard)
  @Get('/link/:value')
  @UseInterceptors(CacheInterceptor)
  async processLink(@Req() req: Request, @Res() resp) {
    const { value } = req.params;
    const fixtures = await this.fixtureService.processLink(value);

    return resp.json({
      fixtures,
      code: 0,
      message: 'Operation successful',
    });
  }
}
