import axios from 'axios';

const apiKeyWeather = '6f69403d87c3aa83bc813caf140e36e5';

interface currentWeather {
  name:string
}
interface weatherState {
  currentWeather: currentWeather[]
}

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

const weather = {
  state: {
    currentWeather: [],
  },
  mutations: {
    setCurrentWeather(state:weatherState, payload:currentWeather[]): void {
      state.currentWeather = payload;
    },
  },
  actions: {
    async getForecastWeather({ commit }: any): Promise<void> {
      const { data } = await axios.get<Array<WeatherData>>('https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: 53.6,
            lon: 34.33333,
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
    CURRENT_WEATHER(state:weatherState):currentWeather[] {
      return state.currentWeather;
    },
  },
};

export default weather;
