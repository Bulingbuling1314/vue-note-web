import { createStore } from 'vuex'
import user from './model/user'

import getters from './getters'

export default createStore({
  modules: {
    user
  },
  getters
})
