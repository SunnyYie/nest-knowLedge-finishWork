export interface HttpRes<T> {
  code: 0 | -1
  msg: 'ok' | 'fail'
  data: T
}
