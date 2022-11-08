import axios from 'axios';
import { WeatherData, WeatherState, Coords } from '@/interfaces/Iweather';

const apiKeyWeather = '6f69403d87c3aa83bc813caf140e36e5';

const weather = {
  state: {
    currentWeather: [],
  },
  mutations: {
    setCurrentWeather(state:WeatherState, payload:WeatherData): void {
      state.currentWeather = payload;
    },
  },
  actions: {
    async getForecastWeather({ commit }: any, payload: Coords): Promise<void> {
      const { data } = await axios.get<Array<WeatherData>>('https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: payload.lat,
            lon: payload.lon,
            units: 'metric',
            lang: 'ru',
            appid: apiKeyWeather,
          },
        });

      commit('setCurrentWeather', data);
    },
  },
  getters: {
    CURRENT_WEATHER(state:WeatherState):WeatherData {
      return state.currentWeather;
    },
  },
};

export default weather;
