import { Test, TestingModule } from '@nestjs/testing';
import { ProductPatentService } from './product_patent.service';

describe('ProductPatentService', () => {
  let service: ProductPatentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPatentService],
    }).compile();

    service = module.get<ProductPatentService>(ProductPatentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
