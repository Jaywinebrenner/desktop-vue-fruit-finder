import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./styles/style.scss";
import axios from 'axios';
import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import VueGeolocation from "vue-browser-geolocation";
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: "YOUR_API_TOKEN",
  },
});
Vue.use(VueGeolocation);

// Allows global use of Axios
Vue.prototype.$axios = axios;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyD-XN5YMLorHKmbdEpT6DH1M9SJCIa8iUM",
  authDomain: "desktop-fruit-finder.firebaseapp.com",
  databaseURL: "https://desktop-fruit-finder.firebaseio.com",
  projectId: "desktop-fruit-finder",
  storageBucket: "desktop-fruit-finder.appspot.com",
  messagingSenderId: "100321669862",
  appId: "1:100321669862:web:dd9d655abb9efc0735c127",
  measurementId: "G-X3KBWZ4ZKV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
