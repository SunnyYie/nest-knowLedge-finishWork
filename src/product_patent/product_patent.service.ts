import { Injectable } from '@nestjs/common';
import { CreateProductPatentDto } from './dto/create-product_patent.dto';
import { UpdateProductPatentDto } from './dto/update-product_patent.dto';

@Injectable()
export class ProductPatentService {
  create(createProductPatentDto: CreateProductPatentDto) {
    return 'This action adds a new productPatent';
  }

  findAll() {
    return `This action returns all productPatent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productPatent`;
  }

  update(id: number, updateProductPatentDto: UpdateProductPatentDto) {
    return `This action updates a #${id} productPatent`;
  }

  remove(id: number) {
    return `This action removes a #${id} productPatent`;
  }
}
