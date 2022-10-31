import { createStore } from 'vuex';
import time from './module/time';
import weather from './module/weather';

export default createStore({
  modules: {
    time,
    weather,
  },
});
