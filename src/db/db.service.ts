const tcb = require('@cloudbase/node-sdk')

export type DbType = {
  // 连接数据库
  collection: (doc: string) => any
  // 服务器时间
  serverDate: () => Date

  command: {
    in: (params: string[]) => any
  }
}

export class DbService {
  db: DbType
  constructor() {
    console.log('数据库连接成功')

    const app = tcb.init({})
    this.db = app.database()
  }
}
