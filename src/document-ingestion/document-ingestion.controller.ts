import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileParserDto } from 'src/completion/dto/payload.dto';
import { DocumentIngestionService } from './document-ingestion.service';
import { CreateIndexDTO } from './dto/create-index.dto';

@Controller('document-ingestion')
export class DocumentIngestionController {
  constructor(private documentIngestionService: DocumentIngestionService) {}

  @Post()
  createIndex(@Body() createIndexDTO: CreateIndexDTO) {
    return this.documentIngestionService.run(createIndexDTO);
  }

  @Post('pdf')
  @ApiOperation({
    summary: 'Ingests pdf data to vector database for querying later',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: String })
  @UseInterceptors(FileInterceptor('file', { preservePath: true }))
  async parsePdfFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileParserDto,
  ) {
    return this.documentIngestionService.ingestUserDocuments(file, body);
  }
}
