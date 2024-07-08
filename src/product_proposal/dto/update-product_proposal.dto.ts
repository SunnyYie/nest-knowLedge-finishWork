import { PartialType } from '@nestjs/mapped-types';
import { CreateProductProposalDto } from './create-product_proposal.dto';

export class UpdateProductProposalDto extends PartialType(CreateProductProposalDto) {}
