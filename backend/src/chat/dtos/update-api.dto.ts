import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateApiDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  enabled: boolean;
}
