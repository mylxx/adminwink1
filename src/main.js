import Vue from 'vue'
import $ from 'jquery'
import cookie from 'cookie'
import router from './router'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import {newCommon} from './js/common/index';
import './styles/common.scss';
import './js/common/filters'
import 'video.js/dist/video-js.css'
import commonApi from './js/common/api'
import JsEncrypt from 'jsencrypt'
import {publicKey} from './js/common/global'

Vue.use(VueAxios,Axios,$);
Vue.use(cookie);
Vue.use(ElementUI);
Vue.use(Vuex);

Axios.defaults.withCredentials = true;

Vue.prototype.$axios = Axios;
Vue.prototype.newCommon = newCommon;
Vue.prototype.commonApi = commonApi;
Vue.prototype.$encrypt = (txt) => {
  let encryptor = new JsEncrypt()
  encryptor.setPublicKey(publicKey)
  let encryptoPasswd = encryptor.encrypt(txt)
  return encryptoPasswd
}

Vue.prototype.index = new Vue();
// Vue.prototype.index.search;
Vue.prototype.locationOnload=(routers)=>{
  vm.$router.push({path:'/entry'+routers});
}
Vue.prototype.search=()=>{
  vm.index.search.getListData("1");
}
Vue.config.productionTip = false;

var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})


