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
import { DocumentIngestionDto } from 'src/completion/dto';
import { DocumentIngestionService } from './document-ingestion.service';

@ApiTags('document-ingestion')
@Controller('document-ingestion')
export class DocumentIngestionController {
  constructor(private documentIngestionService: DocumentIngestionService) {}

  @Post('pdf')
  @ApiOperation({
    summary:
      "Ingests user's pdf document to vector database for querying later, this will be stored in a separate namespace and will be used for querying only for that user",
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: String })
  @UseInterceptors(
    FileInterceptor('file', { preservePath: true, dest: 'upload' }),
  )
  async parsePdfFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: DocumentIngestionDto,
  ) {
    return this.documentIngestionService.ingestUserDocuments(file, body.email);
  }
}
