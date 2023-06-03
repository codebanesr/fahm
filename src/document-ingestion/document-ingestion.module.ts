import { Module } from '@nestjs/common';
import { DocumentIngestionController } from './document-ingestion.controller';
import { DocumentIngestionService } from './document-ingestion.service';
import { PineconeService } from 'src/pinecone/pinecone.service';

@Module({
  controllers: [DocumentIngestionController],
  exports: [],
  imports: [],
  providers: [DocumentIngestionService, PineconeService],
})
export class DocumentIngestionModule {}
