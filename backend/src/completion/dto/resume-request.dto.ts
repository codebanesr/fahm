import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResumeRequestDTO {
  @ApiProperty({
    description: 'Resume text',
    example: 'Lorem ipsum dolor sit amet',
  })
  @IsString()
  resumeText: string;
  // Other future parameters
}
