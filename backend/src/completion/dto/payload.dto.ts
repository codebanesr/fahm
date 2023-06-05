import { ApiProperty } from '@nestjs/swagger';

export class FileParserDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to be parsed.',
  })
  file: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    description: 'The payload containing the data that has to be extracted.',
    example: {
      name: '<name from resume>',
      email: '<email from resume>',
      phone: '<phone number from resume>',
      linkedin: '<linkedin profile url>',
      github: '<github profile url>',
      website: '<personal website url>',
      position: '<most recent position from experience section>',
      company: '<most recent company from experience section>',
    },
  })
  payload: Record<string, any>;
}
