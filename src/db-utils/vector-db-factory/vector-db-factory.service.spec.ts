import { Test, TestingModule } from '@nestjs/testing';
import { VectorDbFactoryService } from './vector-db.provider';

describe('VectorDbFactoryService', () => {
  let service: VectorDbFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VectorDbFactoryService],
    }).compile();

    service = module.get<VectorDbFactoryService>(VectorDbFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
