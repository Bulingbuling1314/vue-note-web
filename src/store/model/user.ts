import { user as userInfo, menu } from '@/assets/mock/index'
import router from '@/router'
import { formatDynamicRouting, setDefaultRoute, clone } from '@/utils/util'
import Layout from "@/components/Layout.vue"
import { SET_TOKEN, REMOVE_TOKEN, SET_USER_INFO, GET_USER_INFO } from "@/utils/localStorage"

const user = {
    state: {
        userInfo: null,
        userMenu: null,
        currentMenu: null
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
                    SET_USER_INFO(JSON.stringify(user))
                    resolve(user)
                } else {
                    reject('error!')
                }
            })
        },
        SetMenu({ state, commit }: any) {
            const myMenu = clone(menu)
            //处理需要动态的路由
            let routes: Array<any> = formatDynamicRouting(myMenu);
            const userMenu = {
                path: '/',
                name: 'LAYOUT',
                component: Layout,
                meta: {},
                children: [...routes]
            }
            commit('SET_USER_MENU', routes)
            commit('SET_USER_INFO', JSON.parse(GET_USER_INFO() || "{}"))
            setDefaultRoute([userMenu])
            router.addRoute(userMenu);
        },

        // 登出
        Logout({ commit }: any) {
            commit('SET_USER_INFO', null)
            commit('SET_USER_MENU', null)
            commit('SET_CURRENT_MENU', null)
            REMOVE_TOKEN()
            router.replace({ path: "/login" });
        }
    }
}

export default user