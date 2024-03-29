import { Injectable } from '@nestjs/common';
import { FixtureService } from './modules/fixture/fixture.service';
import { FixtureFilterDto } from './modules/fixture/fixture.dto';

@Injectable()
export class AppService {
  constructor(private fixtureService: FixtureService) {}

  async getServerStatus(): Promise<string> {
    const { port } = process.env;
    return `Servar runing on port ${port || 9800}`;
  }

  async getFilter(data: FixtureFilterDto) {
    return await this.fixtureService.getAllFixtures(data);
  }
}
