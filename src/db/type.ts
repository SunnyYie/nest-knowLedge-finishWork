export type DbListData = {
  data: any[]
  requestId: string
  count?: number
}

export type DbLimitListData = {
  data: any[]
  requestId: string
  count: number
}

export type DbDeleteData = {
  deleted: number
  requestId: string
}

export type DbUpdateData = {
  updated: number
  requestId: string
}

export type DbCreateData = {
  id: string
  requestId: string
}
