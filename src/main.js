import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./styles/style.scss";
import axios from 'axios';
import './firebaseApp'
import firebase from "firebase/app";
import 'firebase/firestore'
import VueGeolocation from "vue-browser-geolocation";
import * as VueGoogleMaps from 'vue2-google-maps';
import VModal from "vue-js-modal/dist/index.nocss.js";
import "vue-js-modal/dist/styles.css";
import UUID from "vue-uuid";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.use(UUID);

Vue.use(VModal);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GEOCODE_KEY,
    libraries: "places", // necessary for places input
  },
});
Vue.use(VueGeolocation);

// Allows global use of Axios
Vue.prototype.$axios = axios;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const db = firebase.firestore();

export default db;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
