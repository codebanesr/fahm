import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIndexDTO {
  @ApiProperty({ example: '/path/to/directory' })
  @IsString()
  @IsNotEmpty()
  directoryPath: string;

  @ApiProperty({ example: 'my-index' })
  @IsString()
  @IsNotEmpty()
  pineconeIndexName: string;

  @ApiProperty({ example: 'my-namespace' })
  @IsString()
  @IsNotEmpty()
  pineconeNamespace: string;
}
