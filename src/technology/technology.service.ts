import { Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { CreateTechnologyDto } from './dto/create-technology.dto'

@Injectable()
export class TechnologyService {
  constructor(private readonly DbService: DbService) {}

  async create(CreateTechnologyDto: CreateTechnologyDto) {
    const res = await this.DbService.db.collection('ipms-technology').add({
      ...CreateTechnologyDto,
      created: this.DbService.db.serverDate(),
    })

    return res
  }

  async find(params) {
    let res, count
    if (params.status && params.status.split(' ').length > 0) {
      const _ = this.DbService.db.command

      res = await this.DbService.db
        .collection('ipms-technology')
        .where({
          status: _.in(params.status.split(' ')),
        })
        .get()

      count = await this.DbService.db
        .collection('ipms-technology')
        .where({
          status: _.in(params.status.split(' ')),
        })
        .count()
    } else {
      res = await this.DbService.db.collection('ipms-technology').where(params).get()
      count = await this.DbService.db.collection('ipms-technology').where(params).count()
    }

    return {
      data: res.data,
      count: count.total,
    }
  }

  async update(id: string, updateTechnologyDto: any) {
    delete updateTechnologyDto._id

    const res = await this.DbService.db
      .collection('ipms-technology')
      .doc(id)
      .update({
        ...updateTechnologyDto,
        updated: Date.now(),
      })

    return res
  }

  async remove(id: string) {
    const res = await this.DbService.db.collection('ipms-technology').doc(id).remove()

    return res
  }
}
