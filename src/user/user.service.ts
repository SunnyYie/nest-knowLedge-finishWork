import { Injectable } from '@nestjs/common/decorators'
import { CreateUserDto, HttpUserCreate, UpdateUserDto } from './dto/create-user.dto'
import { DbService } from '../db/db.service'
import { DbListData, DbDeleteData, DbUpdateData } from '../db/type'

@Injectable()
export class UserService {
  constructor(private readonly DbService: DbService) {}

  async create(HttpUserCreate: HttpUserCreate) {
    const res = await this.DbService.db.collection('ipms-user').add({
      ...HttpUserCreate,
      created: this.DbService.db.serverDate(),
    } as CreateUserDto)

    return res
  }

  async findStudent(params) {
    const search_params = {
      role: 'student',
      ...params,
    }

    if (search_params.phone) {
      search_params.phone = parseInt(search_params.phone)
    }

    delete search_params.skip
    delete search_params.limit

    const count_res = await this.DbService.db.collection('ipms-user').where(search_params).count()

    const res: DbListData = await this.DbService.db
      .collection('ipms-user')
      .where(search_params)
      .skip(parseInt(params.skip) || 0)
      .limit(parseInt(params.limit) || 10)
      .get()

    res.count = count_res

    return res
  }

  async findAdmin() {
    const res: DbListData = await this.DbService.db
      .collection('ipms-user')
      .where({
        role: 'admin',
      })
      .get()

    return res
  }

  async find(params) {
    if (params.phone) {
      params.phone = parseInt(params.phone)
    }

    const res: DbListData = await this.DbService.db.collection('ipms-user').where(params).get()

    return res
  }

  async delete(id) {
    const res: DbDeleteData = await this.DbService.db.collection('exam-user').doc(id).remove()
    return res
  }

  async update(id: string, UpdateUserDto: UpdateUserDto) {
    const res: DbUpdateData = await this.DbService.db.collection('exam-user').doc(id).update(UpdateUserDto)
    return res
  }
}
