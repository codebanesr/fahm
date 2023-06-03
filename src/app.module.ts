import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompletionController } from './completion/completion.controller';
import { CompletionService } from './completion/completion.service';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './api-token/api-token.module';
import { JwtModule } from '@nestjs/jwt';
import { SupabaseService } from './supabase/supabase.service';
import { DocumentIngestionService } from './document-ingestion/document-ingestion.service';
import { PineconeService } from './pinecone/pinecone.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    JwtModule.register({
      secret: process.env.jwtKey, // Replace with your secret key
      signOptions: { expiresIn: '24d' }, // Set the token expiration time
    }),
    AuthModule,
  ],
  controllers: [AppController, CompletionController],
  providers: [AppService, CompletionService, SupabaseService, DocumentIngestionService, PineconeService],
})
export class AppModule {}
