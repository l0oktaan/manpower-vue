import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
import VuexPersistence from 'vuex-persist'

const getDefaultState = () => {
  return {
    empty_position : null,
    empty_position_name : null,
    //---------- Change List ------------
    change_list : null,
    change_list_link : null,
    change_list_page : null,
    prefix_list : null,
    level_list : null,
  }
}
export default new Vuex.Store({
  state: getDefaultState(),
  plugins: [new VuexPersistence().plugin],
  
  getters: {
    empty_position (state){
      return state.empty_position
    },
    test (state){
      return state.test
    },
    empty_position_name (state){
      return state.empty_position_name
    },
    change_list (state){
      return state.change_list
    },
    change_list_link (state){
      return state.change_list_link
    },
    change_list_page (state){
      return state.change_list_page
    },
    prefix_list (state){
      return state.prefix_list
    },
    level_list (state){
      // if (!state.level_list){
      //   await state.dispatch('get_level_list')
      // }
      return state.level_list
    },
  },
  mutations: {
    resetState (state) {
      Object.assign(state, getDefaultState())      
    },
    empty_position (state, data){
      state.empty_position = data
    },
    empty_position_name (state, data){
      state.empty_position_name = data
    },
    change_list (state, data){
      
      state.change_list = data
    },
    change_list_link (state, data){
      state.change_list_link = data
    },
    change_list_page (state, data){
      state.change_list_page = data
    },
    prefix_list (state, data){
      state.prefix_list = data
    },
    level_list (state, data){
      state.level_list = data
    }
    
  },
  actions: {
    resetState ({ commit }) {
      commit('resetState')
    },
    async get_empty_position ({commit}){
      let path = '/api/empty'
      let response = await axios.get(path)
      commit('empty_position',response.data.data)
    },
    async get_change({commit, path}){
      if (!path){
        path = '/api/change'
      }      
      console.log('path :' + path)
      let response = await axios.get(path)
      
      commit('change_list',response.data.data)
      commit('change_list_link',response.data.links)
      commit('change_list_page',response.data.meta)
    },
    async get_prefix_list ( {commit}){
      let path = '/api/prefix'
      let response = await axios.get(path)
      
      commit('prefix_list',response.data)
    },
    async get_level_list ( {commit}){
      let path = '/api/level_hold'
      let response = await axios.get(path)
      
      commit('level_list',response.data)
    }
  },
  modules: {
  }
})
