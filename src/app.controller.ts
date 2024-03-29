import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { FixtureFilterDto } from './dto/fixture.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getServerStatus(@Req() req: Request, @Res() resp) {
    const result = await this.appService.getServerStatus();
    resp.json({
      code: 0,
      message: result,
    });
  }

  @Get('/filter')
  @UseInterceptors(CacheInterceptor)
  async getFilter(
    @Req() req: Request<null, null, null, FixtureFilterDto>,
    @Res() resp,
  ) {
    const filter = req.query;
    const fixtures = await this.appService.getFilter(filter);

    return resp.json({
      ...fixtures,
      code: 0,
      message: 'Operation successful',
    });
  }
}
