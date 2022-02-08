import { user as userInfo, menu } from '@/assets/mock/index'
import router from '@/router'
import { formatDynamicRouting, setDefaultRoute } from '@/utils/util'
import Layout from "@/components/Layout.vue"
import { SET_TOKEN } from "@/utils/localStorage"

const user = {
    state: {
        userInfo: {},
        userMenu: null,
        currentMenu: ""
    },
    mutations: {
        SET_USER_INFO: (state: any, userInfo: Object) => {
            state.userInfo = userInfo
        },
        SET_USER_MENU: (state: any, userMenu: Array<Object>) => {
            state.userMenu = userMenu
        },
        SET_CURRENT_MENU: (state: any, currentMenu: string) => {
            state.currentMenu = currentMenu
        }
    },
    actions: {
        Login({ state, commit }: any, form: {userName: string, password: string}) {
            return new Promise((resolve, reject) => {
                const user = userInfo.find((item: { userName: string; password: string }) => {
                    return form.userName === item.userName && form.password === item.password
                })
                if(user) {
                    commit("SET_USER_MENU", null);
                    commit('SET_USER_INFO', user)
                    SET_TOKEN(user.token)
                    resolve(user)
                } else {
                    reject('error!')
                }
            })
        },
        async SetMenu({ state, commit }: any) {
            //处理需要动态的路由
            let routes: Array<any> = formatDynamicRouting(menu);
            const userMenu = {
                path: '/',
                name: 'LAYOUT',
                component: Layout,
                meta: {},
                children: [...routes]
            }
            router.addRoute(userMenu);
            commit('SET_USER_MENU', routes)
            setDefaultRoute([userMenu])
        }
    }
}

export default user