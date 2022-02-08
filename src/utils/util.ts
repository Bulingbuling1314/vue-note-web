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
const loadView = (view: string) => { // 路由懒加载
    return () => import(`@/views/${view}/index.vue`)
};

const formatDynamicRouting = (routerMap: any) => {
    let dynamicRouting = routerMap
    for(let item of dynamicRouting) {
        item.name = item.name.toLocaleUpperCase()
        item.component = loadView(item.component)()
        if(item.children && item.children.length > 0) {
            formatDynamicRouting(item.children)
        }
    }
    return dynamicRouting
}


/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
const setDefaultRoute = (routes: any[]) => {
    routes.forEach((v: any, i: number) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name }
            setDefaultRoute(v.children)
        }
    })
}



export {
    formatDynamicRouting,
    setDefaultRoute
}