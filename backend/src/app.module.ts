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
  ],
  controllers: [AppController, CompletionController],
  providers: [AppService, CompletionService, SupabaseService],
})
export class AppModule {}
