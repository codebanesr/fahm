import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveDocumentsDto {
  @ApiProperty({ example: 'namespace', description: 'Namespace' })
  @IsNotEmpty()
  @IsString()
  namespace: string;

  @ApiProperty({ example: 'indexName', description: 'Index name' })
  @IsNotEmpty()
  @IsString()
  indexName: string;

  @ApiProperty({ example: { key: 'value' }, description: 'Filter object' })
  filter: Record<string, string>;
}
