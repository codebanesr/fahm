import { Module } from '@nestjs/common';
import { DocumentIngestionController } from './document-ingestion.controller';
import { DocumentIngestionService } from './document-ingestion.service';
import { VectorAdapterProvider } from 'src/db-utils/vector-db-factory/vector-db.provider';

@Module({
  controllers: [DocumentIngestionController],
  exports: [],
  imports: [],
  providers: [DocumentIngestionService, VectorAdapterProvider],
})
export class DocumentIngestionModule {}
