import { Module } from '@nestjs/common';
import { ProductPatentService } from './product_patent.service';
import { ProductPatentController } from './product_patent.controller';

@Module({
  controllers: [ProductPatentController],
  providers: [ProductPatentService],
})
export class ProductPatentModule {}
