import { user as userInfo, menu } from '@/assets/mock/index'
import router from '@/router'
import { formatDynamicRouting } from '@/utils/util'
import Layout from "@/components/Layout.vue"

const user = {
    state: {
        userInfo: {},
        userMenu: []
    },
    mutations: {
        SET_USER_INFO: (state: any, userInfo: Object) => {
            state.userInfo = userInfo
        },
        SET_USER_MENU: (state: any, userMenu: Array<Object>) => {
            state.userMenu = userMenu
        }
    },
    actions: {
        Login({ state, commit }: any, form: {userName: string, password: string}) {
            return new Promise((resolve, reject) => {
                const user = userInfo.find((item: { userName: string; password: string }) => {
                    return form.userName === item.userName && form.password === item.password
                })
                if(user) {
                    commit('SET_USER_INFO', user)
                    resolve(user)
                } else {
                    reject('error!')
                }
            })
        },
        SetMenu({ state, commit }: any, rolu: string) {
            return new Promise((resolve, reject) => {
                const userRolu = menu.find((item: { rolu: string }) => item.rolu === rolu)
                const menuList = formatDynamicRouting(userRolu.menu)
                const currentMenu = {
                    path: '/',
                    name: 'LAYOUT',
                    component: Layout,
                    meta: {},
                    children: [...menuList]
                }
                if(menuList) {
                    commit('SET_USER_MENU', currentMenu)
                    resolve(currentMenu)
                } else {
                    reject('error')
                }
            })
        }
    }
}

export default user