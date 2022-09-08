import { createStore } from 'vuex';
import time from './module/time';

export default createStore({
  modules: {
    time,
  },
});
