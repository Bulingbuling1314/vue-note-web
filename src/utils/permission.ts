import router from "@/router";
import { useStore } from "vuex"
console.log(useStore)
const store = useStore()
router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    console.log(next);
    console.log(store)
    if(store) {
        store.dispatch('getUserInfo', {})
    }
    if(to.meta.isLogin) {
    }
    next()
});
