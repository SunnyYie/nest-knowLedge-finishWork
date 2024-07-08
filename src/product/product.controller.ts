import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Put } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto'

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const res = await this.productService.create(createProductDto)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    }
  }

  @Get(':user_id')
  async findAll(@Param('user_id') user_id, @Req() requset) {
    const res = await this.productService.find({
      user_id: user_id,
    })

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
      count: res.count,
    }
  }

  @Get()
  async findOne(@Query() query) {
    const res = await this.productService.find({
      ...query,
    })

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
      count: res.count,
    }
  }

  @Put()
  async update(@Body() updateProductDto: UpdateProductDto) {
    const res = await this.productService.update(updateProductDto._id, updateProductDto)

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
      count: res.count,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(id)

    return {
      code: 0,
      msg: 'ok',
    }
  }
}
