import { getUserInfo } from '@/api/user'

const user = {
    state: {
        userInfo: {}
    },
    mutations: {
        SET_USER_INFO: (state: any, userInfo: Object) => {
            state.userInfo = userInfo
        }
    },
    action: {
        getUserInfo({ commit }: any) {
            debugger
            getUserInfo({}).then(res => {
                commit('SET_USER_INFO', res)
                console.log(res)
            })
        }
    }
}

export default user