import { Test, TestingModule } from '@nestjs/testing';
import { VectorDBClient } from '../vector-db-client.interface';
import { VectorAdapterProvider } from './vector-db.provider';

describe('VectorDBClient', () => {
  let service: VectorDBClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VectorAdapterProvider],
    }).compile();

    service = module.get<VectorDBClient>(VectorDBClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
