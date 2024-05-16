/** 获取token **/
function getToken(){
  return localStorage.getItem('token')
}

/** 存储token **/
function setToken(val){
  localStorage.setItem('token',val)
}

/** 清除token **/
function removeToken(){
  localStorage.removeItem('token')
}

/** 获取自动登陆状态 **/
function getAutoLogin() {
  const localStorageItem = localStorage.getItem('autoLogin');
  if(typeof localStorageItem == 'string'){
    return Boolean(localStorage.getItem('autoLogin'))
  }else{
    return localStorage.getItem('autoLogin')
  }
}

/** 存储自动登陆状态 **/
function setAutoLogin(val) {
  localStorage.setItem('autoLogin', val)
}

/** 清除自动登陆状态 **/
function removeAutoLogin() {
  localStorage.removeItem('autoLogin')
}

export default {
  getToken,
  setToken,
  removeToken,
  getAutoLogin,
  setAutoLogin,
  removeAutoLogin
}
