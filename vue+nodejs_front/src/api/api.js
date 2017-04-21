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
  login(data) {
    return axios.post(baseUrl + 'user/login', data)
  }

  /*获取用户*/
  getUser(data) {
    return axios.post(baseUrl + 'user/getUser', data)
  }

  /*添加分类*/

  AddCatagory(data) {
    return axios.post(baseUrl + 'catagory/add', data)
  }

  /*获取分类*/
  getCatagory(data) {
    return axios.post(baseUrl + 'catagory/get', data)
  }

  /*删除分类*/
  removeCatagory(data) {
    return axios.post(baseUrl + 'catagory/remove', data)
  }

  /*修改分类*/
  updataCatagory(data) {
    return axios.post(baseUrl + 'catagory/updata', data)
  }

  /*新增文章*/
  addArtical(data) {
    return axios.post(baseUrl + 'artical/add', data)
  }

  /*分页获取文章*/
  getArtical(data) {
    return axios.post(baseUrl + 'artical/get', data)
  }

  /*编辑文章*/
  editorArtical(data) {
    return axios.post(baseUrl + 'artical/editor', data)
  }
}


export default new Api()
