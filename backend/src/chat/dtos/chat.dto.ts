import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class ChatDto {
  @ApiProperty({ type: String, example: 'who is the president of usa' })
  @IsString()
  question: string;

  @ApiProperty({ type: [String], example: ['A', 'B'] })
  @IsArray()
  @ArrayNotEmpty()
  history: string[];

  @ApiProperty({ type: String, example: 'asdfxx1' })
  @IsString()
  user_dir: string;
}
