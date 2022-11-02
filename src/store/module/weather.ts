import axios from 'axios';

const apiKeyWeather = '6f69403d87c3aa83bc813caf140e36e5';

interface WeatherData {
  name: string,
  sys: {
    country: string,
  },
  main: {
    temp: number,
    tempMax: number,
    tempMin: number,
  },
  weather: [
    {
      description: string,
      icon: string,
    }
  ]
}
interface weatherState {
  currentWeather: WeatherData
}
const weather = {
  state: {
    currentWeather: [],
  },
  mutations: {
    setCurrentWeather(state:weatherState, payload:WeatherData): void {
      state.currentWeather = payload;
    },
  },
  actions: {
    async getForecastWeather({ commit }: any, payload: {lat:number, lon:number}): Promise<void> {
      console.log(payload);
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
      console.log(data);

      commit('setCurrentWeather', data);
    },
  },
  getters: {
    CURRENT_WEATHER(state:weatherState):WeatherData {
      return state.currentWeather;
    },
  },
};

export default weather;
