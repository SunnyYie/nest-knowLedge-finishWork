import { Test, TestingModule } from '@nestjs/testing';
import { ProductProposalService } from './product_proposal.service';

describe('ProductProposalService', () => {
  let service: ProductProposalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductProposalService],
    }).compile();

    service = module.get<ProductProposalService>(ProductProposalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
