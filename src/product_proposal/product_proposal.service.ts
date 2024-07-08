import { Injectable } from '@nestjs/common';
import { CreateProductProposalDto } from './dto/create-product_proposal.dto';
import { UpdateProductProposalDto } from './dto/update-product_proposal.dto';

@Injectable()
export class ProductProposalService {
  create(createProductProposalDto: CreateProductProposalDto) {
    return 'This action adds a new productProposal';
  }

  findAll() {
    return `This action returns all productProposal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productProposal`;
  }

  update(id: number, updateProductProposalDto: UpdateProductProposalDto) {
    return `This action updates a #${id} productProposal`;
  }

  remove(id: number) {
    return `This action removes a #${id} productProposal`;
  }
}
