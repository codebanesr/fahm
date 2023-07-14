import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty({
    example: 'llmskey',
    description: 'The name of the API key',
  })
  @IsNotEmpty()
  @IsString()
  keyName: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'The username associated with the API key',
  })
  @IsNotEmpty()
  @IsString()
  username: string;
}
