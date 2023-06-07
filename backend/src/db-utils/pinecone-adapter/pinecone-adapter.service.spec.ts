import { Test, TestingModule } from '@nestjs/testing';
import { PineconeAdapterService } from './pinecone-adapter.service';

describe('PineconeAdapterService', () => {
  let service: PineconeAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PineconeAdapterService],
    }).compile();

    service = module.get<PineconeAdapterService>(PineconeAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
