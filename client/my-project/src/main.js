import Vue from 'vue'
import App from './App.vue'
import VueAxios from "vue-axios";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(VueAxios, axios);

import {
  NavbarPlugin,
  TablePlugin,
  PaginationPlugin
} from "bootstrap-vue";
[
  NavbarPlugin,
  TablePlugin,
  PaginationPlugin
].forEach((x) => Vue.use(x));

// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     return config;
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function(response) {
//     // Do something with response data
//     return response;
//   },
//   function(error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

Vue.config.productionTip = false
Vue.config.errorHandler = () => {
  alert("folder was already scanned or path is not defined correctly");
};

new Vue({
  render: h => h(App),
}).$mount('#app')
