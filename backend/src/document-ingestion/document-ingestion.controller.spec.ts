import { Test, TestingModule } from '@nestjs/testing';
import { DocumentIngestionController } from './document-ingestion.controller';

describe('DocumentIngestionController', () => {
  let controller: DocumentIngestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentIngestionController],
    }).compile();

    controller = module.get<DocumentIngestionController>(DocumentIngestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
