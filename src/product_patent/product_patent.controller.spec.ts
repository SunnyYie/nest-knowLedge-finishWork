import { Test, TestingModule } from '@nestjs/testing';
import { ProductPatentController } from './product_patent.controller';
import { ProductPatentService } from './product_patent.service';

describe('ProductPatentController', () => {
  let controller: ProductPatentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPatentController],
      providers: [ProductPatentService],
    }).compile();

    controller = module.get<ProductPatentController>(ProductPatentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
