import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import router from './router'
import Toasted from 'vue-toasted';

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers['Authorization'] = localStorage.getItem('token')
Vue.prototype.axios = axios
Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.use(Toasted)

if(localStorage.getItem('token')) {
  Vue.prototype.isAuthenticated = true
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    position => {
      localStorage.setItem('lat',  position.coords.latitude)
      localStorage.setItem('lng', position.coords.longitude)
    },
    function error() {
      alert("Please enable your GPS position feature.");
    },
    { enableHighAccuracy: true }
  );
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
