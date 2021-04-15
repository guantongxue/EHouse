// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// ant-design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import store from './store'
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//vue-video-player
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false

Vue.use(Antd);
Vue.use(VueAxios, axios)
Vue.use(VideoPlayer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
