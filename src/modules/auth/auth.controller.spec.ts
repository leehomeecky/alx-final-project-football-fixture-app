import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/dto/auth.dto';
import { NotAcceptableException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  const mockRegisterUser = jest.fn();
  const mockUserLogin = jest.fn().mockReturnValue({
    token: 'string',
    firstName: 'string',
    lastName: 'string',
    email: 'test@mail.com',
    password: 'Password1$',
    isAdmin: false,
    role: 'USER',
    createdAt: 'Date',
    updatedAt: 'Date',
    deletedAt: 'Date',
    deleted: false,
    _id: '192681o414it714124112312',
    code: 0,
    message: 'operation successful',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .useMocker((token) => {
        if (token === AuthService) {
          return { registerUser: mockRegisterUser, userLogin: mockUserLogin };
        }
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('User registration', () => {
    it('should correctly pass request params validation', async () => {
      const resp: Response = {} as Response;
      const req: any = {} as Request;
      const body: RegisterUserDto = {} as any;

      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'firstname cannot be empty'),
      );

      body.firstName = '';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'firstname cannot be empty'),
      );

      body.firstName = 'test';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'lastname cannot be empty'),
      );

      body.firstName = 'test';
      body.lastName = '';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'lastname cannot be empty'),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'email cannot be empty'),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = '';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'email cannot be empty'),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = '';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'email cannot be empty'),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = 'test';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(
          null,
          'email must match a valid email format: name@domain.com',
        ),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = 'test@ask';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(
          null,
          'email must match a valid email format: name@domain.com',
        ),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = 'test@mail.com';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'password cannot be empty'),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = 'test@mail.com';
      body.password = '';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(null, 'password cannot be empty'),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = 'test@mail.com';
      body.password = 'test-password';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(
          null,
          'password must contain at least one capital & small letter, number and special characters',
        ),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = 'test@mail.com';
      body.password = 'teT$1';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(
          null,
          'length of password must be greater than 6',
        ),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = 'test@mail.com';
      body.password = 'tesT$134adsfasdfawefawefqaweq2e3##sdf3';
      await expect(controller.registerUser(req, body, resp)).rejects.toEqual(
        new NotAcceptableException(
          null,
          'length of password must be lesser than 20',
        ),
      );

      body.firstName = 'test';
      body.lastName = 'test';
      body.email = 'test@mail.com';
      body.password = 'Password1$';

      jest.clearAllMocks();
      resp.json = jest.fn();
      await controller.registerUser(req, body, resp);

      expect(resp.json).toHaveBeenCalledWith({
        description: 'Operation successful',
        code: 0,
      });
    });
  });

  describe('User login', () => {
    const req: any = {} as Request;
    const resp: Response = {} as Response;
    const body: LoginUserDto = {} as any;

    const paramScenarios = [
      {},
      { email: '' },
      { email: 'asdfsd' },
      { email: 'test@test.com' },
      { email: 'test@test.com', password: '' },
      { email: 'test@test.com', password: 'test-password' },
      { email: 'test@test.com', password: 'teT$1' },
      {
        email: 'test@test.com',
        password: 'tesT$134adsfasdfawefawefqaweq2e3##sdf3',
      },
    ];

    it.each(paramScenarios)(
      'Should correctly pass request params validation %s',
      async () => {
        await expect(controller.loginUser(req, body, resp)).rejects.toEqual(
          new NotAcceptableException(null, 'Invalid email/password'),
        );
      },
    );

    it('Should login successfully', async () => {
      body.email = 'test@test.com';
      body.password = 'Password1$';

      expect(await controller.loginUser(req, body, resp)).toEqual({
        token: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'test@mail.com',
        password: 'Password1$',
        isAdmin: false,
        role: 'USER',
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
