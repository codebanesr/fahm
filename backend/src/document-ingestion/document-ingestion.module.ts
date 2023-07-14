import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeySchema } from 'src/chat/schema/api-key.schema';
import { VectorDBModule } from 'src/db-utils/vector-db.module';
import { UsersModule } from 'src/users/users.module';
import { DocumentIngestionController } from './document-ingestion.controller';
import { DocumentIngestionService } from './document-ingestion.service';
import { FileService } from './file.service';
import { FileSchema } from './schema/file.schema';

@Module({
  controllers: [DocumentIngestionController],
  exports: [DocumentIngestionService],
  imports: [
    UsersModule,
    VectorDBModule,
    MongooseModule.forFeature([
      { name: 'File', schema: FileSchema },
      { name: 'ApiKey', schema: ApiKeySchema },
    ]),
  ],
  providers: [DocumentIngestionService, FileService],
})
export class DocumentIngestionModule {}
