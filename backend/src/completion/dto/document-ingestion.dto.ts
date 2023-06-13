import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DocumentIngestionDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to be parsed.',
  })
  file: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    required: false,
    description:
      'The file to be parsed, if email is not passed, the docs will be moved to master_dir',
  })
  @IsOptional()
  email: string;
}
