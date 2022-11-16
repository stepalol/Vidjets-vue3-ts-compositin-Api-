import { createStore } from 'vuex';
import time from './module/time';
import weather from './module/weather';
import rate from './module/rate';

export default createStore({
  modules: {
    time,
    weather,
    rate,
  },
});
