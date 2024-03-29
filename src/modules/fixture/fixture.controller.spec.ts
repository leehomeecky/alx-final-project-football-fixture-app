import { Test, TestingModule } from '@nestjs/testing';
import { FixtureController } from './fixture.controller';
import { FixtureService } from './fixture.service';
import { CreateFixtureDto, UpdateFixtureDto } from '../../dto/fixture.dto';
import { NotAcceptableException } from '@nestjs/common';

describe('FixtureController', () => {
  let controller: FixtureController;
  const mockCreateFixture = jest.fn();
  const mockUpdateFixture = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixtureController],
      providers: [FixtureService],
    })
      .useMocker(() => {
        return {
          createFixture: mockCreateFixture,
          updateFixture: mockUpdateFixture,
        };
      })
      .compile();

    controller = module.get<FixtureController>(FixtureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Fixture', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;
      const body: CreateFixtureDto = {} as any;

      await expect(controller.createFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'homeTeamId cannot be empty'),
      );

      body.homeTeamId = '';
      await expect(controller.createFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'homeTeamId cannot be empty'),
      );

      body.homeTeamId = '12';
      await expect(controller.createFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'awayTeamId cannot be empty'),
      );

      body.homeTeamId = '16';
      body.awayTeamId = '';
      await expect(controller.createFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'awayTeamId cannot be empty'),
      );

      body.homeTeamId = '16';
      body.awayTeamId = '16';
      await expect(controller.createFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'referee cannot be empty'),
      );

      body.homeTeamId = '16';
      body.awayTeamId = '16';
      body.referee = '';
      await expect(controller.createFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'referee cannot be empty'),
      );

      body.homeTeamId = '16';
      body.awayTeamId = '16';
      body.referee = 'asjhaasjasiua';
      await expect(controller.createFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'matchDate cannot be empty'),
      );

      body.homeTeamId = '16';
      body.awayTeamId = '16';
      body.referee = 'asjhaasjasiua';
      body.matchDate = '';
      await expect(controller.createFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'matchDate cannot be empty'),
      );

      body.homeTeamId = '16';
      body.awayTeamId = '16';
      body.referee = 'asjhaasjasiua';
      body.matchDate = '2023-09-09';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.createFixture(req, resp, body);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Update Fixture', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;
      const body: UpdateFixtureDto = {} as any;

      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      body.id = '';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      body.id = '92';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'homeTeamId cannot be empty'),
      );

      body.id = '92';
      body.homeTeamId = '';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'homeTeamId cannot be empty'),
      );

      body.id = '92';
      body.homeTeamId = '12';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'awayTeamId cannot be empty'),
      );

      body.id = '92';
      body.homeTeamId = '16';
      body.awayTeamId = '';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'awayTeamId cannot be empty'),
      );

      body.id = '92';
      body.homeTeamId = '16';
      body.awayTeamId = '12';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'referee cannot be empty'),
      );

      body.id = '92';
      body.homeTeamId = '16';
      body.awayTeamId = '136';
      body.referee = '';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'referee cannot be empty'),
      );

      body.id = '92';
      body.homeTeamId = '16';
      body.awayTeamId = '136';
      body.referee = 'asjhaasjasiua';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'matchDate cannot be empty'),
      );

      body.id = '92';
      body.homeTeamId = '16';
      body.awayTeamId = '1336';
      body.referee = 'asjhaasjasiua';
      body.matchDate = '';
      await expect(controller.updateFixture(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'matchDate cannot be empty'),
      );

      body.id = '92';
      body.homeTeamId = '16';
      body.awayTeamId = '136';
      body.referee = 'asjhaasjasiua';
      body.matchDate = '2023-09-09';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.updateFixture(req, resp, body);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Get All Fixtures', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.getAllFixtures(req, resp);

      expect(resp.json).toHaveBeenCalledWith({
        fixtures: [],
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Get A Fixture', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;

      await expect(controller.getFixture(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      req.params.id = '';
      await expect(controller.getFixture(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      req.params.id = '78';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.getFixture(req, resp);

      expect(resp.json).toHaveBeenCalledWith({
        fixture: {},
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Delete Fixture', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;

      await expect(controller.deleteFixture(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      req.params.id = '';
      await expect(controller.deleteFixture(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      req.params.id = '78';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.deleteFixture(req, resp);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Create Fixture Link', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;
      const body: any = {} as any;

      await expect(controller.createLink(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'fixtureId cannot be empty'),
      );

      body.fixtureId = '';
      await expect(controller.createLink(req, resp, body)).rejects.toEqual(
        new NotAcceptableException(null, 'fixtureId cannot be empty'),
      );

      body.fixtureId = '891';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.createLink(req, resp, body);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Process Fixture Link', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;

      await expect(controller.processLink(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'value cannot be empty'),
      );

      req.params.value = '';
      await expect(controller.processLink(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'value cannot be empty'),
      );

      req.params.value = 'ertdfjuyui56ytgh';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.processLink(req, resp);

      expect(resp.json).toHaveBeenCalledWith({
        fixtures: [],
        description: 'Operation successful',
        code: 0,
      });
    });
  });
});
