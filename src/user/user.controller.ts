import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common/decorators'
import { CreateUserDto, HttpUserCreate, SearchUserDto, UpdateUserDto } from './dto/create-user.dto'
import { DbListData, DbDeleteData, DbUpdateData, DbCreateData } from '../db/type'
import { getMenuFactory } from 'src/role/config'
import { UserService } from './user.service'
import { Role } from '../role/role.enum'
import { HttpRes } from '../types/http'
import { Roles } from 'src/role'

type UserResData = {
  id: string
  requestId: string
}

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 新增管理员
  @Post('/add_admin')
  @Roles(Role.super_admin)
  async add_admin(@Body() body) {
    const phone = body.phone
    const res: DbListData = await this.userService.find({
      phone,
    })

    // 如果已经存在该用户，则更新为管理员
    if (res.data.length) {
      let user_id = res.data[0]._id
      await this.userService.update(user_id, {
        role: Role.admin,
      })
    } else {
      await this.userService.create({
        phone: body.phone,
        role: Role.admin,
        avatar: 'https://exam-project-1255639690.cos.ap-nanjing.myqcloud.com/topic/fc.png',
      })
    }

    return {
      code: 0,
      msg: 'ok',
    }
  }

  // 获取权限菜单
  @Get('/menu')
  async get_menu(@Req() request: any) {
    const role = request?.session?.role || 'student'
    const menus = getMenuFactory(role)

    return {
      code: 0,
      msg: 'ok',
      data: menus,
    }
  }

  @Post('/login')
  async login(@Body() body, @Req() request: any) {
    let role: Role
    let user

    if (body.code == '111111') {
      role = Role.student
    } else if (body.code == '222222') {
      role = Role.admin
    } else if (body.code == '333333') {
      role = Role.super_admin
    } else {
      return {
        code: -1,
        msg: '验证码错误',
      }
    }

    const user_db: DbListData = await this.userService.find({
      phone: body.phone,
    })
    const user_list = user_db.data

    if (user_list.length) {
      user = user_db.data[0]
      user.role = role
    } else {
      const res: DbCreateData = await this.userService.create({
        phone: parseInt(body.phone),
        role,
        avatar: 'https://exam-project-1255639690.cos.ap-nanjing.myqcloud.com/topic/fc.png',
      } as HttpUserCreate)

      const user_db: DbListData = await this.userService.find({
        phone: body.phone,
      })
      user = user_db.data[0]
    }

    // 设置session
    // request.session.login = 1
    // request.session.role = role
    // request.session.phone = user.phone
    // request.session.user_id = user._id

    return {
      code: 0,
      msg: 'ok',
      data: user,
    } as HttpRes<Object>
  }

  @Post('/logout')
  logout(@Req() request: any) {
    // request.session.login = null
    // request.session.role = null
    // request.session.phone = null
    // request.session.user_id = null

    return {
      code: 0,
      msg: '退出登录成功',
    }
  }

  @Get()
  async getUserInfo(@Param('phone') phone: number, @Req() request: any) {
    // const user_id = request.session.user_id
    const user_db: DbListData = await this.userService.find({
      phone,
    } as SearchUserDto)

    return {
      code: 0,
      msg: 'ok',
      data: user_db.data[0],
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.create(createUserDto)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<UserResData>
  }

  // 查找学生
  @Get('/student')
  async findStudent(@Query() params: any, @Req() request: any) {
    const res: DbListData = await this.userService.findStudent(params)

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
      count: res.count,
    } as HttpRes<any[]>
  }

  @Get('/admin')
  async findAdmin() {
    const res: DbListData = await this.userService.findAdmin()

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
    } as HttpRes<any[]>
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res: DbListData = await this.userService.find({
      _id: id,
    } as SearchUserDto)

    return {
      code: 0,
      msg: 'ok',
      data: res.data[0],
    } as HttpRes<Object>
  }

  // 修改用户信息
  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    const res: DbUpdateData = await this.userService.update(id, {
      ...UpdateUserDto,
    })

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<Object>
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res: DbDeleteData = await this.userService.delete(id)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<Object>
  }
}
