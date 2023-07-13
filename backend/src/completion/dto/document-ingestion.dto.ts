import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DocumentIngestionDto {
  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'The file to be parsed.',
  })
  file: Express.Multer.File;

  @ApiProperty({
    type: String,
    required: false,
    description:
      'The file to be parsed, if identifier is not passed, the docs will be moved to master_dir',
  })
  @IsOptional()
  identifier: string;
}
