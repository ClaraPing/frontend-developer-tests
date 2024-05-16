import http from '@/api/http';
const eraserToken = '/fe/api/v1';
const eraserSaas = '/fe/api/v1/merchant';

class UserApi {
  /** 登陆获取token **/
  token(params){
    return  http.httpPost(`${eraserToken}/token`,params)
  }
  getData(params){
    return  http.httpGet(`https://randomuser.me/api/?results=100`)
  }
  /** 获取用户信息 **/
  getUserInfo(){
    return  http.httpGet(`${eraserSaas}/userInfo`)
  }

  /** 修改密码 **/
  updatePassword(data){
    return  http.httpPut(`${eraserSaas}/password`,data)
  }

  /** 修改用户信息 **/
  updateUserInfo(data){
    return  http.httpPut(`${eraserSaas}/userInfo`,data)
  }
}

export default new UserApi()
