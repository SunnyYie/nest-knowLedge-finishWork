import { User } from '../entities/user.entity'

export type CreateUserDto = Pick<User, 'created' | 'phone' | 'role' | 'avatar'>

export type UpdateUserDto = Partial<CreateUserDto>
export type SearchUserDto = Partial<CreateUserDto>

export type HttpUserCreate = Pick<User, 'phone' | 'role' | 'avatar'>

// 填写用户信息
export type HttpUserInfoPost = Pick<User, 'name'> & { avatar?: string }
