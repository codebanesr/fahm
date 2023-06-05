import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTokenService } from './api-token.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api-token')
@Controller('api-token')
export class AuthController {
  constructor(private apiTokenService: ApiTokenService) {}
  email = 'shanur.cse.nitap@gmail.com';

  //   the user has to actually request for this token as an api key, this won't be generated for every request
  @Post('create')
  async createToken() {
    const rateLimitValue = 20; // Set the rate limit value as per your logic
    const token = await this.apiTokenService.generateJwtToken({
      email: this.email,
      rateLimitValue,
    });
    return { token };
  }

  @Get('/:idToken')
  async getAllTokens(@Param('idToken') idToken: string) {
    return this.apiTokenService.getTokensByEmail(this.email);
  }
}
