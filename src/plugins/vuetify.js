import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
Vue.use(Vuetify);
import VueGoogleCharts from 'vue-google-charts';
Vue.use(VueGoogleCharts);

export default new Vuetify({
    iconfont: 'mdi' | 'fa'
});
