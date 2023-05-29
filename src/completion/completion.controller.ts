import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompletionService } from './completion.service';
import { ResumeRequestDTO } from './dto/resume-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('resume')
export class CompletionController {
  constructor(private readonly completionService: CompletionService) {}
  @Post('text')
  public async postResume(@Body() body: ResumeRequestDTO) {
    const { resumeText } = body;
    const extractedInfo = await this.completionService.parseResume(resumeText);
    return extractedInfo;
  }

  @Post('test')
  public async testSampling(@Body() body: ResumeRequestDTO) {
    const { resumeText } = body;
    return this.completionService.completeResponse(resumeText);
  }

  @Post('file')
  @ApiOperation({ summary: 'Parse file and return text' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, type: String })
  @UseInterceptors(FileInterceptor('file', { preservePath: true }))
  async parseFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const resumeText = await this.completionService.getFileText(file);
    return this.completionService.parseResume(resumeText);
  }
}
