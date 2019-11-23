import { Test, TestingModule } from '@nestjs/testing';
import { KitchenController } from './kitchen.controller';

describe('Kitchen Controller', () => {
  let controller: KitchenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchenController],
    }).compile();

    controller = module.get<KitchenController>(KitchenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
