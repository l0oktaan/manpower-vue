import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empty_position : null,
    test: 'test'
  },
  getters: {
    empty_position (state){
      return state.empty_position
    },
    test (state){
      return state.test
    }
  },
  mutations: {
    empty_position (state, data){
      state.empty_position = data
    }
  },
  actions: {
    get_empty_position ({commit}){
      let path = '/api/empty'
      return new Promise((resolve, reject) => {
        axios.get(path)
        .then(response=>{
          commit('empty_position',response.data.data)
        })
        .catch(error=>{
          reject(error);
        })
      })
    }
  },
  modules: {
  }
})
