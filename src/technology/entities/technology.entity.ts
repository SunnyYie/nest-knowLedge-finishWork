export class Technology {
  _id: string
  // 产品图片
  technology_image: string
  // 产品名称
  title: string
  // 产品日期
  application_date: Date
  // 产品描述
  description: string
  // 备注
  remark: string
  // 产品编号
  document_id: number
  // ipc分类号
  ipc_id: string

  // 关联的提案
  proposal: string[]
  // 关联专利
  patent: string[]
}
