import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty({ type: String })
  @IsString()
  username: string;
}
