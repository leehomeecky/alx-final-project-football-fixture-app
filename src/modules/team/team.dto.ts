import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  teamName: string;

  @IsString()
  @IsNotEmpty()
  teamCode: string;

  @IsString()
  @IsNotEmpty()
  slogan: string;

  @IsString()
  @IsNotEmpty()
  stadium: string;

  @IsString()
  @IsNotEmpty()
  coach: string;

  @IsEmpty()
  logo: string;
}

export class UpdateTeamDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  teamName?: string;

  @IsOptional()
  @IsString()
  teamCode?: string;

  @IsOptional()
  @IsString()
  slogan?: string;

  @IsOptional()
  @IsString()
  stadium?: string;

  @IsOptional()
  @IsString()
  coach?: string;

  @IsEmpty()
  logo?: string;
}
