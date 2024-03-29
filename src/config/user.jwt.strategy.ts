import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(
  Strategy,
  'userStrategy',
) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRETE_KEY,
    });
  }

  async validate(payload) {
    const { id } = payload;
    const user = await this.userModel
      .findById(id)
      .where('deletedAt')
      .equals(null)
      .exec();
    if (!user) throw new UnauthorizedException(null, 'Please login first');
    return user.toObject();
  }
}
