export interface IResponse<T> {
    code: string | number
    msg?: string
    data: T
}