import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';
import { NotAcceptableException } from '@nestjs/common';

describe('TeamController', () => {
  let controller: TeamController;
  const mockCreateTeam = jest.fn();
  const mockUpdateTeam = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [TeamService],
    })
      .useMocker(() => {
        return { createTeams: mockCreateTeam, updateTeams: mockUpdateTeam };
      })
      .compile();

    controller = module.get<TeamController>(TeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Team', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;
      const body: CreateTeamDto = {} as any;
      const file: any = {} as any;

      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'teamName cannot be empty'),
      );

      body.teamName = '';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'teamName cannot be empty'),
      );

      body.teamName = 'test';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'teamCode cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = '';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'teamCode cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'slogan cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = '';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'slogan cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'stadium cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = '';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'stadium cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'coach cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      body.coach = '';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'coach cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      body.coach = 'uayahada';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'logo cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      body.coach = 'uayahada';
      body.logo = '';
      await expect(
        controller.createTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'logo cannot be empty'),
      );

      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      body.coach = 'uayahada';
      body.logo = 'aaofijfafkahfa';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.createTeams(req, resp, body, file);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Update Team', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;
      const body: UpdateTeamDto = {} as any;
      const file: any = {} as any;

      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(new NotAcceptableException(null, 'id cannot be empty'));

      body.id = '';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(new NotAcceptableException(null, 'id cannot be empty'));

      body.id = '23';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'teamName cannot be empty'),
      );

      body.id = '78';
      body.teamName = '';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'teamName cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'teamCode cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = '';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'teamCode cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'slogan cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = '';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'slogan cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'stadium cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = '';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'stadium cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'coach cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      body.coach = '';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'coach cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      body.coach = 'uayahada';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'logo cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      body.coach = 'uayahada';
      body.logo = '';
      await expect(
        controller.updateTeams(req, resp, body, file),
      ).rejects.toEqual(
        new NotAcceptableException(null, 'logo cannot be empty'),
      );

      body.id = '78';
      body.teamName = 'test';
      body.teamCode = 'test';
      body.slogan = 'asjha as fai';
      body.stadium = 'ajksasu';
      body.coach = 'uayahada';
      body.logo = 'aaofijfafkahfa';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.updateTeams(req, resp, body, file);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Get All Team', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.getAllTeams(req, resp);

      expect(resp.json).toHaveBeenCalledWith({
        teams: [],
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Get A Team', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;

      await expect(controller.getTeam(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      req.params.id = '';
      await expect(controller.getTeam(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      req.params.id = '78';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.getTeam(req, resp);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('Delete Team', () => {
    it('should correctly pass request params validation', async () => {
      const req: any = {} as Request;
      const resp: Response = {} as Response;

      await expect(controller.deleteTeam(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      req.params.id = '';
      await expect(controller.deleteTeam(req, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'id cannot be empty'),
      );

      req.params.id = '78';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.deleteTeam(req, resp);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });
});
