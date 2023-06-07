import { Module } from '@nestjs/common';
import { VectorDBModule } from 'src/db-utils/vector-db.module';
import { DocumentIngestionController } from './document-ingestion.controller';
import { DocumentIngestionService } from './document-ingestion.service';

@Module({
  controllers: [DocumentIngestionController],
  exports: [],
  imports: [VectorDBModule],
  providers: [DocumentIngestionService],
})
export class DocumentIngestionModule {}
