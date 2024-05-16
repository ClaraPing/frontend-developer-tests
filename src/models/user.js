import { request } from 'ice';
import userApi from '@/api/userApi';
export const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default {
  state: {
    userInfo: {}
  },

  // 定义改变该模型的纯函数
  reducers: {
    userInfoUpdate(prevState, payload) {
      // console.log("prevState: ", prevState)
      // console.log("payload: ", payload)

      return {
        ...payload
      }
    },
  },

  // 定义处理该模型副作用的函数
  effects: (dispatch) => ({
    async fetchUserInfo() {
      await delay(1000);
      await userApi.getUserInfo().then((res) => {
        if(res.code == '0'){
          dispatch.user.userInfoUpdate({
            userInfo: res.data
          });
        }
      });
    },
  })
};
