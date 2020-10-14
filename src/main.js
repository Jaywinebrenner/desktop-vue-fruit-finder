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
import { firebaseConfig } from "./firebase";
import { API_KEY } from "./geocoder"
import VModal from "vue-js-modal/dist/index.nocss.js";
import "vue-js-modal/dist/styles.css";

Vue.use(VModal);

Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
    libraries: "places" // necessary for places input
  },
});
Vue.use(VueGeolocation);

// Allows global use of Axios
Vue.prototype.$axios = axios;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
