import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Req() req: Request,
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) resp,
  ) {
    await this.authService.registerUser(body);
    resp.json({
      code: 0,
      message: 'Operation successful',
    });
  }

  @Post('/login')
  async loginUser(
    @Req() req: Request,
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) resp,
  ) {
    const result = await this.authService.loginUser(body);
    resp.json({
      ...result,
      code: 0,
      message: 'Operation successful',
    });
  }
}
