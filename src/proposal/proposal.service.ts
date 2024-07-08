import { Injectable } from '@nestjs/common'
import { CreateProposalDto } from './dto/create-proposal.dto'
import { DbService } from '../db/db.service'
import { status } from 'src/types/status'
import createUUID from 'src/utils/uuid'

@Injectable()
export class ProposalService {
  constructor(private readonly DbService: DbService) {}

  async create(createProposalDto: CreateProposalDto) {
    const res = await this.DbService.db.collection('ipms-proposal').add({
      ...createProposalDto,
      proposal_id: 'TN' + `${createUUID()}`,
      status: createProposalDto.technologyDisclosure ? status.submitted : status.supplementary_material,
      created: Date.now(),
    })

    return res
  }

  async find(params) {
    let res, count
    const _ = this.DbService.db.command
    if (params.status && params.status.split(' ').length > 0) {
      res = await this.DbService.db
        .collection('ipms-proposal')
        .where({
          status: _.in(params.status.split(' ')),
        })
        .get()

      count = await this.DbService.db
        .collection('ipms-proposal')
        .where({
          status: _.in(params.status.split(' ')),
        })
        .count()
    } else if (params.productId) {
      res = await this.DbService.db
        .collection('ipms-proposal')
        .where({
          product_ids: _.in([params.productId]),
        })
        .get()

      count = await this.DbService.db
        .collection('ipms-proposal')
        .where({
          product_ids: _.in([params.productID]),
        })
        .count()
    } else if (params.technologyId) {
      res = await this.DbService.db
        .collection('ipms-proposal')
        .where({
          technology_ids: _.in([params.technologyId]),
        })
        .get()

      count = await this.DbService.db
        .collection('ipms-proposal')
        .where({
          technology_ids: _.in([params.technologyId]),
        })
        .count()
    } else {
      if (params.finished) {
        const finishStr = params.finished
        const finished = finishStr === 'true'
        params.finished = finished
      }

      res = await this.DbService.db.collection('ipms-proposal').where(params).get()
      count = await this.DbService.db.collection('ipms-proposal').where(params).count()
    }

    return {
      data: res.data,
      count: count.total,
    }
  }

  async update(id: string, updateProposalDto: any) {
    delete updateProposalDto._id

    const isEdit = updateProposalDto.isEdit
    delete updateProposalDto.isEdit

    if (isEdit && updateProposalDto.productId) {
      const data = await this.DbService.db.collection('ipms-proposal').where({ _id: id }).get()
      const productId = updateProposalDto.productId

      delete updateProposalDto.productId

      const res = await this.DbService.db
        .collection('ipms-proposal')
        .doc(id)
        .update({
          ...updateProposalDto,
          product_ids: data.data[0].product_ids.filter((item) => item !== productId),
          updated: Date.now(),
        })

      return res
    } else if (isEdit && updateProposalDto.technologyId) {
      const data = await this.DbService.db.collection('ipms-proposal').where({ _id: id }).get()
      const technologyId = updateProposalDto.technologyId

      delete updateProposalDto.technologyId

      const res = await this.DbService.db
        .collection('ipms-proposal')
        .doc(id)
        .update({
          ...updateProposalDto,
          technology_ids: data.data[0].technology_ids.filter((item) => item !== technologyId),
          updated: Date.now(),
        })

      return res
    } else {
      if (id) {
        const res = await this.DbService.db
          .collection('ipms-proposal')
          .doc(id)
          .update({
            ...updateProposalDto,
            status: updateProposalDto.status ? updateProposalDto.status : updateProposalDto.technologyDisclosure ? status.submitted : status.supplementary_material,
            updated: Date.now(),
          })

        return res
      } else if (updateProposalDto.technologyId) {
        const resArr = []
        const ids = updateProposalDto.proposalIds
        const technologyId = updateProposalDto.technologyId

        delete updateProposalDto.technologyId
        delete updateProposalDto.proposalIds

        for (const id of ids) {
          const data = await this.DbService.db.collection('ipms-proposal').where({ _id: id }).get()

          const currentData = data.data[0].technology_ids && data.data[0].technology_ids.length > 0 ? data.data[0].technology_ids.filter((item) => item !== null) : [technologyId]

          const res = await this.DbService.db
            .collection('ipms-proposal')
            .doc(id)
            .update({
              ...updateProposalDto,
              technology_ids: currentData.findIndex((item) => item === technologyId) !== -1 ? [...currentData] : [...currentData, technologyId],
              updated: Date.now(),
            })

          resArr.push(res)
        }

        return resArr
      } else {
        const resArr = []
        const ids = updateProposalDto.proposalIds
        const productID = updateProposalDto.productId

        delete updateProposalDto.productId
        delete updateProposalDto.proposalIds

        for (const id of ids) {
          const data = await this.DbService.db.collection('ipms-proposal').where({ _id: id }).get()

          const currentData = data.data[0].product_ids && data.data[0].product_ids.length > 0 ? data.data[0].product_ids.filter((item) => item !== null) : [productID]

          const res = await this.DbService.db
            .collection('ipms-proposal')
            .doc(id)
            .update({
              ...updateProposalDto,
              product_ids: currentData.findIndex((item) => item === productID) !== -1 ? [...currentData] : [...currentData, productID],
              updated: Date.now(),
            })

          resArr.push(res)
        }

        return resArr
      }
    }
  }

  async remove(id: string) {
    const res = await this.DbService.db.collection('ipms-proposal').doc(id).remove()

    return res
  }
}
