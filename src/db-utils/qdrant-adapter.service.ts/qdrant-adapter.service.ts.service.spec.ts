import { Test, TestingModule } from '@nestjs/testing';
import { QdrantAdapterServiceTsService } from './qdrant-adapter.service.ts.service';

describe('QdrantAdapterServiceTsService', () => {
  let service: QdrantAdapterServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QdrantAdapterServiceTsService],
    }).compile();

    service = module.get<QdrantAdapterServiceTsService>(QdrantAdapterServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
