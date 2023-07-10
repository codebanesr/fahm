import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './api-token/api-token.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompletionController } from './completion/completion.controller';
import { CompletionService } from './completion/completion.service';
import { DocumentIngestionModule } from './document-ingestion/document-ingestion.module';
import { SupabaseService } from './supabase/supabase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';

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
    DocumentIngestionModule,
    MongooseModule.forRoot(
      `mongodb+srv://shanurrahman:${process.env.MONGODB_PASSWORD}@knowledgebase.nkwyehj.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController, CompletionController, ChatController],
  providers: [AppService, CompletionService, SupabaseService, ChatService],
})
export class AppModule {}
