import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  givenName: string;

  @ApiProperty()
  @IsString()
  familyName: string;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsString()
  locale: string;

  @ApiProperty()
  @IsString()
  updatedAt: Date;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty()
  @IsString()
  sub: string;

  @ApiProperty()
  @IsString()
  sid: string;
}
