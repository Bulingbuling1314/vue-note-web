export interface IAddModelFormState {
    id: number
    name: string
    meta: {
        name: string
        icon: string
    }
    component: string
    parentId: number
    path: string
    role: string
    type: string
}