import { RouteRecordRaw } from 'vue-router'
import RouterView from '@/components/RouterView/index.vue'

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
    // 判断当前路径下是否有该文件
    const files = Object.keys(import.meta.glob('@/views/**'))
    if (files.find(file => file.includes(view + '/index.vue'))) {
        return () => import(`@/views/${view}/index.vue`);
    } else {
        return () => import(`@/views/404/index.vue`);
    }
};

const formatDynamicRouting = (routerMap: any) => {
    let dynamicRouting = routerMap
    for (let item of dynamicRouting) {
        if (typeof item.meta === 'string') {
            item.meta = JSON.parse(item.meta)
        }
        item.name = item.name.toLocaleUpperCase()
        if (item.children && item.children.length > 0) {
            item.component = RouterView;
        } else {
            item.component = loadView(item.component)
        }
        if (item.children && item.children.length > 0) {
            formatDynamicRouting(item.children)
        } else {
            delete item['children']
            delete item['redirect']
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


// 深拷贝
function typeOf(obj: any): any {
    const toString: any = Object.prototype.toString;
    const map: any = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
    };
    return map[toString.call(obj)];
}
const clone = (data: any): any => {
    const t = typeOf(data);
    let o: any;

    if (t === "array") {
        o = [];
    } else if (t === "object") {
        o = {};
    } else {
        return data;
    }

    if (t === "array") {
        for (let i = 0; i < data.length; i++) {
            o.push(clone(data[i]));
        }
    } else if (t === "object") {
        for (const i in data) {
            o[i] = clone(data[i]);
        }
    }
    return o;
}

export {
    formatDynamicRouting,
    setDefaultRoute,
    clone
}