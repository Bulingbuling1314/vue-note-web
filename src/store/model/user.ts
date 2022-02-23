// import { user as userInfo, menu } from '@/assets/mock/index'
import router from '@/router'
import { formatDynamicRouting, setDefaultRoute, clone } from '@/utils/util'
import Layout from "@/components/Layout.vue"
import { SET_TOKEN, REMOVE_TOKEN, SET_USER_INFO, GET_USER_INFO, REMOVE_USER_INFO, SET_MENU, GET_MENU, REMOVE_MENU } from "@/utils/localStorage"
import { login } from "@/api/user";
import { getMenu } from "@/api/menu";

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
        Login({ state, commit }: any, form: { userName: string, password: string }) {
            return new Promise((resolve, reject) => {
                login(form).then(res => {
                    if (res.data) {
                        commit("SET_USER_MENU", null);
                        commit('SET_USER_INFO', res.data)
                        SET_TOKEN(res.data.token)
                        SET_USER_INFO(JSON.stringify(res.data))
                        resolve(res.data)
                    } else {
                        reject('error!')
                    }
                })
            })
        },
        async SetMenu({ state, commit, dispatch }: any) {
            let myMenu: Array<any>;
            if (GET_MENU()) {
                myMenu = clone(JSON.parse(GET_MENU() || '[]'))
                dispatch('SetRouter', myMenu)
            } else {
                await getMenu().then(res => {
                    console.log(res)
                    myMenu = clone(res.data)
                    if (myMenu.length === 0) {
                        myMenu.push({
                            "name": "HOME",
                            "path": "home",
                            "component": "home",
                            "meta": {
                                "icon": "HomeOutlined",
                                "name": "首页"
                            }
                        })
                    }
                    SET_MENU(JSON.stringify(myMenu))
                    dispatch('SetRouter', myMenu)
                })
            }
        },

        // 设置路由
        SetRouter({ state, commit, getters }: any, myMenu: any) {
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
            REMOVE_MENU()
            REMOVE_USER_INFO()
            router.replace({ path: "/login" });
        }
    }
}

export default user