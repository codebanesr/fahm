import { ApiProperty } from '@nestjs/swagger';

export class DocumentIngestionDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to be parsed.',
  })
  file: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    description: 'The file to be parsed.',
  })
  email: string;
}
