import { Injectable, Logger } from '@nestjs/common';
import { PineconeClient } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService {
  private logger = new Logger(PineconeService.name);
  private pinecone: PineconeClient;

  async initPinecone(): Promise<PineconeClient> {
    try {
      const pinecone = new PineconeClient();

      await pinecone.init({
        environment: process.env.PINECONE_ENVIRONMENT ?? '',
        apiKey: process.env.PINECONE_API_KEY ?? '',
      });

      return pinecone;
    } catch (error) {
      this.logger.error('Failed to initialize Pinecone Client', error);
      throw new Error('Failed to initialize Pinecone Client');
    }
  }

  async getPineconeClient(): Promise<PineconeClient> {
    if (!this.pinecone) {
      this.pinecone = await this.initPinecone();
    }
    return this.pinecone;
  }
}
