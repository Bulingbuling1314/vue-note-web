import { RouteRecordRaw } from 'vue-router'

/**
 * @description: 处理多层级路由
 * @params {Array<Object>} menuList
 * @type {RouteRecordRaw}
 * @return {Array<Object>}
*/  
// interface IRouter {
//     path: string
//     name: string
//     component: Component
//     meta: Object
//     children: Array<IRouter>
//     redirect: string
// }

const formatDynamicRouting = (menuList: any) => {
    let dynamicRouting = menuList
    for(let item of dynamicRouting) {
        item.name = item.component.toLocaleUpperCase()
        item.component = (() => import(`@/views/${item.component}/index.vue`))()
        if(item.children && item.children.length > 0) {
            formatDynamicRouting(item.children)
        }
    }
    return dynamicRouting
}




export {
    formatDynamicRouting
}