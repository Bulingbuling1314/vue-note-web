import router from "@/router";
import store from "@/store";

import { SET_TOKEN, GET_TOKEN } from "@/utils/localStorage"

//进度条
import NProgress from 'nprogress' ;
import 'nprogress/nprogress.css';

// 路由开始
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 如果没有登陆
  if(!GET_TOKEN() && to.path !== "/login") {
    return next("/login");
  }

  // 如果有登录
  if(GET_TOKEN() && to.path === "/login") {
    return next('/');
  }
  if(!store.getters.userMenu && to.path !== "/login") {
    return store.dispatch("SetMenu").then(() => {
      next({ ...to, replace: true });
    })
  } else {
    next();
  }
})

// 路由结束
router.afterEach((to: any, from: any, next: any) => {
  NProgress.done();
  try {
      //设置标题
      if (to.meta.name) {
          document.title = to.meta.name;
      }
  } catch (err) {}
  //目前左边导航选中的active
  store.commit("SET_CURRENT_MENU", to.name);
});
