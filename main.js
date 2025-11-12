import App from "./App";
import uvUI from "@climblee/uv-ui";
import api from './api'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.use(uvUI);
Vue.config.productionTip = false;
Vue.prototype.$api = api;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia()
  
  // 使用持久化插件
  pinia.use(piniaPluginPersistedstate)
  
  app.use(uvUI);
  app.use(pinia);
  app.config.globalProperties.$api = api;
  
  return {
    app,
    pinia
  };
}
// #endif
