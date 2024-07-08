import { status } from 'src/types/status'

export class Proposal {
  _id: string
  // 用户id
  user_id: string
  // 案件编号
  proposal_id: number
  // 提案名称
  title: string
  // 技术交底材料
  technologyDisclosure: boolean
  // 提案状态
  status: status
  createdAt: Date
  updatedAt: Date

  // 关联产品id数组
  product_ids: string[]
  // 关联技术id数组
  technology_ids: string[]
}
