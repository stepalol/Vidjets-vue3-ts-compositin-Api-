import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import store from './store';
import './assets/fonts/fonts.scss';

createApp(App)
  .use(store)
  .use(VueAxios, axios)
  .mount('#app');
