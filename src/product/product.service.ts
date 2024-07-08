import { Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductService {
  constructor(private readonly DbService: DbService) {}

  async create(createPatentDto: CreateProductDto) {
    const res = await this.DbService.db.collection('ipms-product').add({
      ...createPatentDto,
      created: this.DbService.db.serverDate(),
    })

    return res
  }

  async find(params) {
    let res, count
    if (params.status && params.status.split(' ').length > 0) {
      const _ = this.DbService.db.command

      res = await this.DbService.db
        .collection('ipms-product')
        .where({
          status: _.in(params.status.split(' ')),
        })
        .get()

      count = await this.DbService.db
        .collection('ipms-product')
        .where({
          status: _.in(params.status.split(' ')),
        })
        .count()
    } else {
      res = await this.DbService.db.collection('ipms-product').where(params).get()
      count = await this.DbService.db.collection('ipms-product').where(params).count()
    }

    return {
      data: res.data,
      count: count.total,
    }
  }

  async update(id: string, updateProposalDto: any) {
    delete updateProposalDto._id

    const res = await this.DbService.db
      .collection('ipms-product')
      .doc(id)
      .update({
        ...updateProposalDto,
        updated: Date.now(),
      })

    return res
  }

  async remove(id: string) {
    const res = await this.DbService.db.collection('ipms-product').doc(id).remove()

    return res
  }
}
