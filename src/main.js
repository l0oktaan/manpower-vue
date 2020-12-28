import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { GChart } from 'vue-google-charts'
import axios from 'axios'
import VueAxios from 'vue-axios'
import _ from 'lodash';
import VueFilter from 'vue-filter';
Vue.use(VueFilter);
Object.defineProperty(Vue.prototype, '$_', { value: _ });
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:8000/';
Vue.config.productionTip = false

new Vue({
  created() {
      window.addEventListener('beforeunload', this.beforePageDestroyed)
  },
  methods: {
    beforePageDestroyed: function () {
        this.$store.dispatch('resetState');
    }
  },
  router,
  store,
  vuetify,
  GChart,
  
  render: h => h(App)
}).$mount('#app')
