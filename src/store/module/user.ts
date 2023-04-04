import { defineStore } from "pinia";
import router from '@/router'
import { formatDynamicRouting, setDefaultRoute, clone } from '@/router/config'
import localRouters from '@/router/localRouters.json'
import { SET_TOKEN, REMOVE_TOKEN, GET_MENU, SET_MENU, REMOVE_MENU, GET_USER_INFO, REMOVE_USER_INFO } from "@/utils";
import Layout from "@/layout/index.vue"
import { login, LoginParams, getMenu } from "@/service";
import { IUserState } from "../interface/user";

export const useUserStore = defineStore('user', {
    state: (): IUserState => ({
        userInfo: null,
        userMenu: [],
        currentMenu: null
    }),
    //适合计算属性
    getters: {},
    //适合定义业务逻辑
    actions: {
        login(form: LoginParams) {
            return new Promise((resolve, reject) => {
                login(form).then(res => {
                    if (res.data) {
                        SET_TOKEN(res.data.token)
                        resolve(res.data)
                    } else {
                        reject('error!')
                    }
                })
            })
        },


        async setMenu() {
            let myMenu: Array<any>;
            const menuType = 1  // 1---后台加载路由 0---本地配置路由
            if (GET_MENU()) {
                myMenu = clone(JSON.parse(GET_MENU() || '[]'))
                this.setRouter(myMenu)
            } else {
                if (!menuType) {
                    // 后台获取路由
                    await getMenu().then(res => {
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
                        console.log(myMenu, 53)
                        SET_MENU(JSON.stringify(myMenu))
                        this.setRouter(myMenu)
                    })
                }
                if (menuType) {
                    // 加载本地配置路由
                    if (localRouters.length > 0) {
                        SET_MENU(JSON.stringify(localRouters))
                        this.setRouter(localRouters)
                    }
                }
            }
        },

        // 设置路由
        setRouter(myMenu: any) {
            //处理需要动态的路由
            let routes: Array<any> = formatDynamicRouting(myMenu);
            const userMenu = {
                path: '/',
                name: 'LAYOUT',
                component: Layout,
                meta: {},
                children: [...routes]
            }
            this.userMenu = routes
            this.userInfo = JSON.parse(GET_USER_INFO() || "{}")
            setDefaultRoute([userMenu])
            router.addRoute(userMenu);
        },


        logout() {
            return new Promise(() => {
                REMOVE_TOKEN()
                REMOVE_MENU()
                REMOVE_USER_INFO()
                router.replace({ path: "/login" });
            })
        }
    }
})