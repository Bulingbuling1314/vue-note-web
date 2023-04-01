import { Component } from "vue"

export interface IRouterItem {
    children: IRouterItem[]
    component: Component
    id: number
    meta: IRouterItemMeta
    name: string
    parentId: number
    path: string
    role: string
    type: number
}

export interface IRouterItemMeta {
    icon: string
    name: string
}