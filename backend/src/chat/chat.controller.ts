import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatDto } from './dtos/chat.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiBody({ type: ChatDto })
  async chat(@Body('body') body: ChatDto) {
    const { question, history, user_dir } = body;
    return this.chatService.getAIResponse(question, user_dir, history);
  }

  @Post('machine')
  @ApiBody({ type: ChatDto })
  async machineChat(@Req() request, @Body('body') body: ChatDto) {
    const { question, history } = body;

    // Extract the 'fahm-api-token' header from the request
    const token = request.headers['fahm-api-token'];

    // Check if the token exists
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    return this.chatService.getAIResponse(question, token, history);
  }
}
