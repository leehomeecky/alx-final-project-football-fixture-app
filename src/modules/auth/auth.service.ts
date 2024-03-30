import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { User } from 'src/schema/user.schema';
import { LoginUserDto, RegisterUserDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT } from 'src/utils/constant';
import { Role } from 'src/enum/user.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(data: RegisterUserDto) {
    const { firstName, lastName, email, password } = data;
    const hashPassword = await bcrypt.hash(password, BCRYPT_SALT);
    try {
      await this.userModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role: Role.USER,
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(null, 'User registration failed');
    }
  }

  async loginUser(data: LoginUserDto) {
    const { email, password } = data;
    const user = await this.userModel
      .findOne({ email })
      .where('deletedAt')
      .equals(null)
      .exec();
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new NotFoundException(null, 'Invalid email/password');

    try {
      const token = this.jwtService.sign({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      const userObject = user.toObject();
      delete userObject.password;
      delete userObject.role;
      delete userObject.adminHash;
      delete userObject.isAdmin;

      return {
        ...userObject,
        token,
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(null, 'User Login failed');
    }
  }
}
