import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductPatentService } from './product_patent.service';
import { CreateProductPatentDto } from './dto/create-product_patent.dto';
import { UpdateProductPatentDto } from './dto/update-product_patent.dto';

@Controller('product-patent')
export class ProductPatentController {
  constructor(private readonly productPatentService: ProductPatentService) {}

  @Post()
  create(@Body() createProductPatentDto: CreateProductPatentDto) {
    return this.productPatentService.create(createProductPatentDto);
  }

  @Get()
  findAll() {
    return this.productPatentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPatentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductPatentDto: UpdateProductPatentDto) {
    return this.productPatentService.update(+id, updateProductPatentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPatentService.remove(+id);
  }
}
