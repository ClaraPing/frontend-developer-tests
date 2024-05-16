import http from '@/api/http';

class TestApi {
  /** test page list **/
  getTestData(params){
    return  http.httpGet(`/api`,params)
  }
}

export default new TestApi()
