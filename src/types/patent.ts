export enum patentType {
  // 发明专利
  invention = 'invention',
  // 实用新型
  utility_model = 'utility_model',
  // 外观设计
  design = 'design',
}

export enum patentStatus {
  // 授权
  authorization = 'authorization',
  // 待审查
  substantive_examination = 'substantive_examination',
  // 驳回
  rejection = 'rejection',
}

export enum patentLegalStatus {
  // 待审查
  substantive_examination = 'substantive_examination',
  // 二次审查
  secondary_examination = 'secondary_examination',
  // 授权
  authorization = 'authorization',
  // 驳回
  rejection = 'rejection',
}

export enum patentPaymentStatus {
  // 未缴费
  unpaid = 'unpaid',
  // 已缴费
  paid = 'paid',
}
