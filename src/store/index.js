import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
import VuexPersistence from 'vuex-persist'

export default new Vuex.Store({
  state: {
    empty_position : null,
    empty_position_name : null,
    //---------- Change List ------------
    change_list : null,
    change_list_link : null,
    change_list_page : null
  },
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
  },
  mutations: {
    empty_position (state, data){
      state.empty_position = data
    },
    empty_position_name (state, data){
      state.empty_position_name = data
    },
    change_list (state, data){
      console.log('response :' + data)
      state.change_list = data
    },
    change_list_link (state, data){
      state.change_list_link = data
    },
    change_list_page (state, data){
      state.change_list_page = data
    }
  },
  actions: {
    
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
  },
  modules: {
  }
})
