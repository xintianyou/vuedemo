// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import sxios from 'axios'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import { DatetimePicker } from 'vant';
import vHeader from './page/header';
import vFooter from './page/footer';

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(DatetimePicker);
Vue.component('vHeader',vHeader);
Vue.component('vFooter',vFooter);

Vue.prototype.$http = sxios
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})