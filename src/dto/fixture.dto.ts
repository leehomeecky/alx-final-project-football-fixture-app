import {
  IsDateString,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { FixtureStatus, MatchType } from 'src/enum/fixture.enum';

export class CreateFixtureDto {
  @IsString()
  @IsNotEmpty()
  homeTeamId: string;

  @IsString()
  @IsNotEmpty()
  awayTeamId: string;

  @IsString()
  @IsNotEmpty()
  referee: string;

  @IsNotEmpty()
  @IsEnum(FixtureStatus)
  status: FixtureStatus;

  @IsNotEmpty()
  @IsEnum(MatchType)
  matchType: MatchType;

  @IsNotEmpty()
  @IsDateString()
  matchDate;
}

export class UpdateFixtureDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  homeTeamId: string;

  @IsString()
  @IsOptional()
  awayTeamId: string;

  @IsString()
  @IsOptional()
  referee: string;

  @IsNumber()
  @IsOptional()
  homeTeamScore: number;

  @IsNumber()
  @IsOptional()
  awayTeamScore: number;

  @IsOptional()
  @IsEnum(FixtureStatus)
  status: FixtureStatus;

  @IsOptional()
  @IsEnum(MatchType)
  matchType: MatchType;

  @IsOptional()
  @IsDateString()
  matchDate;
}

export class FixtureFilterDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(FixtureStatus)
  status?: FixtureStatus;

  @IsString()
  @IsOptional()
  referee?: string;

  @IsOptional()
  @IsEnum(MatchType)
  matchType?: MatchType;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsNumberString()
  @IsOptional()
  skip?: string;
}
