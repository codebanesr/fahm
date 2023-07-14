import { Module } from '@nestjs/common';
import { VectorDBModule } from 'src/db-utils/vector-db.module';
import { DocumentIngestionController } from './document-ingestion.controller';
import { DocumentIngestionService } from './document-ingestion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schema/file.schema';
import { FileService } from './file.service';
import { ApiKeySchema } from 'src/chat/schema/api-key.schema';
import { UsersService } from 'src/users/users.service';
import { UserSchema } from 'src/user/schema/user.schema';
import { UsersModule } from 'src/users/users.module';

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
