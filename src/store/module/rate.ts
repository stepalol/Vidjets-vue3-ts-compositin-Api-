import axios from 'axios';

const rate = {
  state: {
    currentRate: [],
  },
  mutations: {
    setCurrentRate(state:any, payload:any): void {
      state.currentRate = payload;
    },
  },
  actions: {
    async getRate({ commit }: any) {
      try {
        const res = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
        commit('setCurrentRate', Object.values(res.data.Valute));
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    CURRENT_RATE(state:any) {
      return state.currentRate;
    },
  },
};

export default rate;
