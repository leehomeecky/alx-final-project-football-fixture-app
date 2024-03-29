import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimiter {
  use(req: Request, res: Response, next: NextFunction) {
    const apiLimiter = rateLimit.rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });

    console.log('called');
    apiLimiter(req, res, next);
  }
}
