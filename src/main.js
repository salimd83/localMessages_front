import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import router from './router'
import Toasted from 'vue-toasted';
import store from './store'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
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
      store.commit('setCoordinates', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
      })
    },
    function error() {
      alert("Please enable your GPS position feature.");
    },
    { enableHighAccuracy: true }
  );
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
