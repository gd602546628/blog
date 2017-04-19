/**
 * Created by gd on 2017/4/18.
 */

import axios from 'axios';
let baseUrl = "";
let product = false;
if (product) {

} else {
  baseUrl = 'http://172.31.60.66:8888/api/'
}
class Api {
  constructor() {

  }

  /*注册*/
  register(data) {
    return axios.post(baseUrl + 'user/register', data)
  }

  /*登录*/
  login(data){
    return axios.post(baseUrl+'user/login',data)
  }

  /*获取用户*/
  getUser(data){
    return axios.post(baseUrl+'user/getUser',data)
  }

}


export default new Api()
