export type StringValues<T> = {
  [K in keyof T]: string
}
