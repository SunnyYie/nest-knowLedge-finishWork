import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DbService } from 'src/db/db.service'


@Module({
  controllers: [ProductController],
  providers: [ProductService, DbService],
  exports: [ProductService],
})
export class ProductModule {}
