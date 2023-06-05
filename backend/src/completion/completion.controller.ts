import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CompletionService } from './completion.service';
import { FileParserDto } from './dto/payload.dto';

@ApiTags('extract')
@Controller('extract')
export class CompletionController {
  constructor(private readonly completionService: CompletionService) {}

  // @Post('test')
  // public async testSampling(@Body() body: ResumeRequestDTO) {
  //   const { resumeText } = body;
  //   return this.completionService.completeResponse(resumeText);
  // }

  @Post('file')
  @ApiOperation({
    summary:
      'Parse doc, xlsx and other file types (not pdf) and extract feature',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: String })
  @UseInterceptors(FileInterceptor('file', { preservePath: true }))
  async parseFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileParserDto,
  ): Promise<string> {
    const resumeText = await this.completionService.getFileText(file);
    return this.completionService.parseResume(resumeText, body.payload);
  }

  @Post('pdf')
  @ApiOperation({ summary: 'Parse pdf file and extract feature' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: String })
  @UseInterceptors(FileInterceptor('file', { preservePath: true }))
  async parsePdfFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileParserDto,
  ) {
    const resumeText = await this.completionService.getPdfText(file);
    return this.completionService.parseResume(resumeText, body.payload);
  }
}
