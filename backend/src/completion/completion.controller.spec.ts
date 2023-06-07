import { Test, TestingModule } from '@nestjs/testing';
import { CompletionController } from './completion.controller';

describe('CompletionController', () => {
  let controller: CompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletionController],
    }).compile();

    controller = module.get<CompletionController>(CompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
