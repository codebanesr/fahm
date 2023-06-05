import { Module } from '@nestjs/common';
import { ApiTokenService } from './api-token.service';
import { AuthController } from './api-token.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtService, ApiTokenService, SupabaseService],
  controllers: [AuthController],
})
export class AuthModule {}
