import axios from 'axios';

const time = {
  mutations: {},
  actions: {
    async getTimeZone() {
      const res = await axios.get('http://worldtimeapi.org/api/timezone');
      return res.data;
    },
    async getExtraTime(_:any, name:string) {
      const res = await axios.get(`http://worldtimeapi.org/api/timezone/${name}`);
      console.log(res.data);
      const extraTime = {
        time: res.data.datetime,
        name: res.data.timezone,
      };
      return extraTime;
    },
  },
  getters: {},
};

export default time;
