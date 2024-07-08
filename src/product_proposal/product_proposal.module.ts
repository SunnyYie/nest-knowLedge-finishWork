import { Module } from '@nestjs/common';
import { ProductProposalService } from './product_proposal.service';
import { ProductProposalController } from './product_proposal.controller';

@Module({
  controllers: [ProductProposalController],
  providers: [ProductProposalService],
})
export class ProductProposalModule {}
