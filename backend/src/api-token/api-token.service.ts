import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from 'src/supabase/supabase.service';

interface IGenerateToken {
  email: string;
  rateLimitValue: number;
}
@Injectable()
export class ApiTokenService {
  async getTokensByEmail(email: string) {
    const supabase = this.supabaseService.getSupabase();
    const { data, error } = await supabase
      .from('users')
      .select('api_key, rate_limit_value')
      .eq('email', email);

    if (error) {
      throw new Error('Failed to fetch user tokens');
    }

    // If no data is returned, the user doesn't exist or has no tokens
    if (!data || data.length === 0) {
      return null;
    }

    const { api_key: apiKey, rate_limit_value: rateLimitValue } = data[0];

    return { apiKey, rateLimitValue };
  }

  constructor(
    private readonly jwtService: JwtService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async generateJwtToken({ email, rateLimitValue }: IGenerateToken) {
    // Check if the API key already exists for the given email
    const supabase = this.supabaseService.getSupabase();
    const { data: existingUser, error: getUserError } = await supabase
      .from('users')
      .select('api_key')
      .eq('email', email);

    if (getUserError) {
      throw new Error('Failed to fetch user data');
    }

    // If the user already has an API key, return it
    if (existingUser && existingUser.length > 0 && existingUser[0].api_key) {
      return existingUser[0].api_key;
    }

    // Generate a new API key
    const payload = { email, rate_limit_value: rateLimitValue };
    const apiKey = await this.jwtService.signAsync(payload);

    // Store the API key and rate limit value in the database
    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ api_key: apiKey, rate_limit_value: rateLimitValue })
      .eq('email', email);

    if (updateError) {
      throw new Error('Failed to store API key and rate limit value');
    }

    return apiKey;
  }
}
