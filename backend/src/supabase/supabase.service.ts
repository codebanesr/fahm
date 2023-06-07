import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.supabase_url,
      process.env.supabase_api_key,
    );
  }

  getSupabase(): SupabaseClient {
    return this.supabase;
  }
}
