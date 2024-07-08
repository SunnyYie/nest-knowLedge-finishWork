import { Test, TestingModule } from '@nestjs/testing';
import { ProductProposalController } from './product_proposal.controller';
import { ProductProposalService } from './product_proposal.service';

describe('ProductProposalController', () => {
  let controller: ProductProposalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductProposalController],
      providers: [ProductProposalService],
    }).compile();

    controller = module.get<ProductProposalController>(ProductProposalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
