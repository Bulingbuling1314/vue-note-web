import router from "@/router";
import store from '@/store'

router.beforeEach((to, from, next) => {
    // store.dispatch('GetUserInfo')
    // .then(res => {
    //     store.dispatch('SetMenu', res.rolu)
    // })
    // .catch(err => {
    //     next("/")
    // })
    // next()
    const token = store.state.token
    // 过滤登录页，防止死循环
    if (!token && to.meta.isLogin) {
      next("/")
    } else {
      next()
    }
});
