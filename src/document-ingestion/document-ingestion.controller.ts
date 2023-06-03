import { Body, Controller, Post } from '@nestjs/common';
import { DocumentIngestionService } from './document-ingestion.service';
import { CreateIndexDTO } from './dto/create-index.dto';

@Controller('document-ingestion')
export class DocumentIngestionController {
  constructor(private documentIngestionService: DocumentIngestionService) {}

  @Post()
  createIndex(@Body() createIndexDTO: CreateIndexDTO) {
    return this.documentIngestionService.run(createIndexDTO);
  }
}
