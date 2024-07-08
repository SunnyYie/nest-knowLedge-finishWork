import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductProposalService } from './product_proposal.service';
import { CreateProductProposalDto } from './dto/create-product_proposal.dto';
import { UpdateProductProposalDto } from './dto/update-product_proposal.dto';

@Controller('product-proposal')
export class ProductProposalController {
  constructor(private readonly productProposalService: ProductProposalService) {}

  @Post()
  create(@Body() createProductProposalDto: CreateProductProposalDto) {
    return this.productProposalService.create(createProductProposalDto);
  }

  @Get()
  findAll() {
    return this.productProposalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productProposalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductProposalDto: UpdateProductProposalDto) {
    return this.productProposalService.update(+id, updateProductProposalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productProposalService.remove(+id);
  }
}
