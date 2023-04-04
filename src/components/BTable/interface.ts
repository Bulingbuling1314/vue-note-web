export interface IList {
    url: string
    method: string
}

export interface IColumnItem {
    title: string
    slot?: string
    key?: string
    width?: string | number
    align?: string
}