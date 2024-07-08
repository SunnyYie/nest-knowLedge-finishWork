import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPatentDto } from './create-product_patent.dto';

export class UpdateProductPatentDto extends PartialType(CreateProductPatentDto) {}
