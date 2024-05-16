import { request } from 'ice';
import { Message } from '@alifd/next';

class Http {
  constructor() {

  }

  /**
   * GET 请求
   * @param {String} url 包含url信息
   * @param  {Object} params 需要发送的参数
   * @param validResponse
   * @returns {Promise}
   * @constructor
   */
  async httpGet(url, params = {}, validResponse = false) {
    try {
      const data = await request.get(url, {
        params
      });

      if(validResponse){
        if(data && (data.code || 0) !== 0 && data.message){
          Message.error(data.message);
          return false
        }
      }
      return data
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * POST 请求
   * @param  {String} url 包含url信息
   * @param  {Object} params 需要发送的参数
   * @param validResponse 是否对返回的response做code==0判断,如果做会弹出data.message
   * @returns {Promise}
   * @constructor
   */
  async httpPost(url, params = {}, validResponse = false) {
    try {
      const data = await request.post(url, params);
      if(validResponse){
        if(data && (data.code || 0) !== 0 && data.message){
          Message.error(data.message);
        }
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Put 请求
   */
  async httpPut(url, params = {}, validResponse = false) {
    try {
      const data = await request.put(url, params);
      console.log(data);
      if(validResponse){
        if(data && (data.code || 0) !== 0 && data.message){
          Message.error(data.message);
        }
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async httpPatch(url, params = {}) {
    try {
      const data = await request.patch(url, params);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async httpDelete(url, params = {}) {
    try {
      const data = await request.delete(url, params);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Http();
