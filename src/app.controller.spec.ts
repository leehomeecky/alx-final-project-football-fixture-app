import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotAcceptableException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  const mockFilterResponse = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .useMocker(() => {
        return { getFilter: mockFilterResponse };
      })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('filter request', () => {
    const resp: Response = {} as Response;
    const reqQuery = {} as any;
    const paramScenarios = [
      {},
      {
        startDate: '',
        endDate: '',
        status: '',
        referee: '',
        matchType: '',
        limit: '',
        skip: '',
      },
      {
        startDate: '',
        endDate: '',
        status: '',
        referee: '',
        matchType: '',
        limit: '',
        skip: '',
      },
    ];

    it.each(paramScenarios)(
      'Should correctly pass request params validation %s',
      async () => {
        await expect(appController.getFilter(reqQuery, resp)).rejects.toEqual(
          new NotAcceptableException(null, 'Invalid filter'),
        );
      },
    );

    it('Should filter successfully', async () => {
      reqQuery.startDat = '';
      reqQuery.endDate = '';
      reqQuery.status = '';
      reqQuery.referee = '';
      reqQuery.matchType = '';
      reqQuery.limit = '';
      reqQuery.skip = '';

      expect(await appController.getFilter(reqQuery, resp)).toEqual({
        createdAt: 'Date',
        updatedAt: 'Date',
        deletedAt: 'Date',
        deleted: false,
        _id: '192681o414it714124112312',
        code: 0,
        message: 'operation successful',
      });
    });
  });
});
