import { Test, TestingModule } from '@nestjs/testing';
import { DocumentIngestionService } from './document-ingestion.service';

describe('DocumentIngestionService', () => {
  let service: DocumentIngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentIngestionService],
    }).compile();

    service = module.get<DocumentIngestionService>(DocumentIngestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
