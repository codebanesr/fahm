import { Test, TestingModule } from '@nestjs/testing';
import { QdrantAdapterService } from './qdrant-adapter.service';

describe('QdrantAdapterService', () => {
  let service: QdrantAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QdrantAdapterService],
    }).compile();

    service = module.get<QdrantAdapterService>(QdrantAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
