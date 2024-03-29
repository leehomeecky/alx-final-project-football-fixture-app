import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { Role, User } from 'src/schema/user.schema';
import { LoginUserDto, RegisterUserDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT } from 'src/utils/constant';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private adminUserModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(data: RegisterUserDto) {
    const { firstName, lastName, email, password } = data;
    const hashPassword = await bcrypt.hash(password, BCRYPT_SALT);
    const role = Role.ADMIN;
    const adminHashString = email + role;
    const adminHash = await bcrypt.hash(adminHashString, BCRYPT_SALT);
    try {
      await this.adminUserModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role,
        isAdmin: true,
        adminHash,
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        null,
        'Admin user registration failed',
      );
    }
  }

  async loginUser(data: LoginUserDto) {
    const { email, password } = data;
    const adminUser = await this.adminUserModel
      .findOne({ email })
      .where('deletedAt')
      .equals(null)
      .exec();

    if (!adminUser || !(await bcrypt.compare(password, adminUser.password)))
      throw new NotFoundException(null, 'Invalid email/password');
    if (!(adminUser.role === Role.ADMIN || adminUser.role === Role.SUPER_ADMIN))
      throw new ForbiddenException(null, 'Access Denied');

    try {
      const token = this.jwtService.sign({
        id: adminUser._id,
        email: adminUser.email,
        role: adminUser.role,
      });

      const userObject = adminUser.toObject();
      delete userObject.password;
      delete userObject.adminHash;

      return {
        ...userObject,
        token,
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(null, 'Admin User Login failed');
    }
  }
}
