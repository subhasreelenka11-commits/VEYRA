import { Test, TestingModule } from '@nestjs/testing';
import { GroomingController } from './grooming.controller';

describe('GroomingController', () => {
  let controller: GroomingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroomingController],
    }).compile();

    controller = module.get<GroomingController>(GroomingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
