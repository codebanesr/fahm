import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatDto } from './dtos/chat.dto';
import { CreateApiKeyDto } from './dtos/create-api-key.dto';
import { ApiKey } from './schema/api-key.schema';
import { UpdateApiDto } from './dtos/update-api.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({
    summary: 'Get AI chat response',
    description:
      'Returns an AI generated response for the provided question and conversation history',
  })
  // @ApiResponse({
  //   status: 200,
  //   description: 'AI response text',
  //   type: ChatResponse,
  // })
  @Post()
  async chat(@Body() body: ChatDto) {
    const { question, history, user_dir } = body;
    return this.chatService.getAIResponse(question, user_dir, history);
  }

  @Post('machine')
  async machineChat(@Req() request, @Body() body: ChatDto) {
    const { question, history } = body;

    // Extract the 'fahm-api-token' header from the request
    const token = request.headers['x_api_token'];

    // Check if the token exists
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    return this.chatService.getAIResponse(question, token, history);
  }

  @Post('key')
  @ApiOperation({
    summary: 'Generate API Key',
  })
  @ApiResponse({
    status: 201,
    description: 'The API key was generated successfully.',
  })
  async generate(@Body() body: CreateApiKeyDto) {
    const { keyName, username } = body;
    return this.chatService.generateApiKey(username, keyName);
  }

  @Delete(':key')
  @ApiOperation({
    summary: 'Delete API Key',
  })
  @ApiResponse({
    status: 200,
    description: 'The API key was deleted successfully',
  })
  async delete(@Param('key') key: string) {
    await this.chatService.deleteApiKey(key);

    return {
      message: 'API key deleted successfully',
    };
  }

  @Get('keys/:userId')
  @ApiOperation({
    summary: 'Get All API Keys',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieved all API keys successfully',
  })
  async getAllKeys(@Param('userId') userId: string) {
    return this.chatService.listKeys(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'The api key was upserted successfully',
    type: ApiKey,
  })
  @ApiOperation({
    summary: 'Update an api user',
  })
  @Put('key/:key')
  updateApiKey(@Param('key') key: string, @Body() updateApiDto: UpdateApiDto) {
    return this.chatService.updateApiKey(key, updateApiDto);
  }
}
