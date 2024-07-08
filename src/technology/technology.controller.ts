import { Controller, Get, Post, Body, Param, Delete, Req, Query, Put } from '@nestjs/common'
import { TechnologyService } from './technology.service'
import { CreateTechnologyDto } from './dto/create-technology.dto'
import { UpdateProductDto } from 'src/product/dto/create-product.dto'

@Controller('api/technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  async create(@Body() createTechnologyDto: CreateTechnologyDto) {
    const res = await this.technologyService.create(createTechnologyDto)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    }
  }


  @Get(':user_id')
  async findAll(@Param('user_id') user_id, @Req() requset) {
    const res = await this.technologyService.find({
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
    const res = await this.technologyService.find({
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
    const res = await this.technologyService.update(updateProductDto._id, updateProductDto)

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
      count: res.count,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.technologyService.remove(id)

    return {
      code: 0,
      msg: 'ok',
    }
  }
}
