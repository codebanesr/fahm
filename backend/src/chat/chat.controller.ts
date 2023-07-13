import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatDto } from './dtos/chat.dto';
import { CreateApiKeyDto } from './dtos/create-api-key.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() body: ChatDto) {
    const { question, history, user_dir } = body;
    return this.chatService.getAIResponse(question, user_dir, history);
  }

  @Post('machine')
  async machineChat(@Req() request, @Body() body: ChatDto) {
    const { question, history } = body;

    // Extract the 'fahm-api-token' header from the request
    const token = request.headers['fahm-api-token'];

    // Check if the token exists
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    return this.chatService.getAIResponse(question, token, history);
  }

  @Post()
  @ApiOperation({
    summary: 'Generate API Key',
  })
  @ApiResponse({
    status: 201,
    description: 'The API key was generated successfully.',
  })
  async generate(@Body() body: CreateApiKeyDto) {
    const { username } = body;
    const apiKey = await this.chatService.generateApiKey(username);
    return {
      key: apiKey,
    };
  }
}
