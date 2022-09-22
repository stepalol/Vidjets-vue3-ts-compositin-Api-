import axios from 'axios';

interface time {
  time:string,
  name:string,
  gmt:number,
}

const time = {
  mutations: {},
  actions: {
    async getTimeZone():Promise<string[]> {
      const res = await axios.get('http://worldtimeapi.org/api/timezone');
      return res.data;
    },
    async getExtraTime(_:unknown, name:string):Promise<time> {
      const res = await axios.get(`http://worldtimeapi.org/api/timezone/${name}`);
      const extraTime = {
        time: res.data.datetime,
        name: res.data.timezone.split('/')[1],
        gmt: +(res.data.utc_offset.split(':')[0]),
      };
      return extraTime;
    },
  },
  getters: {},
};

export default time;
