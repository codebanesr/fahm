import { Module } from '@nestjs/common';
import { VectorDBModule } from 'src/db-utils/vector-db.module';
import { DocumentIngestionController } from './document-ingestion.controller';
import { DocumentIngestionService } from './document-ingestion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schema/file.schema';
import { FileService } from './file.service';

@Module({
  controllers: [DocumentIngestionController],
  exports: [],
  imports: [
    VectorDBModule,
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
  ],
  providers: [DocumentIngestionService, FileService],
})
export class DocumentIngestionModule {}
