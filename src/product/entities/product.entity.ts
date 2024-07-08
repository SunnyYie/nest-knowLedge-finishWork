export class Product {
  _id: string
  // 产品图片
  product_image: string
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

  // 关联本产品的技术
  technology: string[]
  // 关联的提案
  proposal: string[]
  // 关联专利
  patent: string[]
}
