import axios from 'axios';

const time = {
  state: {
    city: 'nn',
  },
  mutations: {},
  actions: {
    async getTimeZone({ state } : { state: any}) {
      const res = await axios.get('http://worldtimeapi.org/api/timezone');
      // .then((res: any) => res.data)
      console.log('res', res);
      state.city = res.data;
      return res.data;
    },
  },
  getters: {},
};

export default time;
