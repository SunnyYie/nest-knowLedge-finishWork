import { patentLegalStatus, patentPaymentStatus, patentStatus, patentType } from 'src/types/patent'

export class Patent {
  // 申请号
  patent_id: number
  // 专利名称
  title: string
  // 申请日
  application_date: Date
  // 申请人
  applicant: string
  // 申请人id
  applicant_id: string
  // 案件编号
  document_id: number
  // 专利类型
  patent_type: patentType
  // 法律状态
  legal_status: patentLegalStatus
  // 案件状态
  status: patentStatus
  // 缴费状态
  payment_status: patentPaymentStatus

  // 关联产品id数组
  product_ids: string[]
  // 关联技术id数组
  technology_ids: string[]
}
