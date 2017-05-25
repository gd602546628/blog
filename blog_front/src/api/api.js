/**
 * Created by gd on 2017/4/18.
 */

import axios from 'axios';
let baseUrl = "";
let product = false;
if (product) {

} else {
  baseUrl = 'http://172.31.61.39:8888/api/'
}
class Api {
  constructor() {
    this.host = 'http://172.31.60.66:8888'
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

  AddCatagory(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'catagory/add', data)
  }

  /*获取分类*/
  getCatagory(data) {

    return axios.post(baseUrl + 'catagory/get', data)
  }

  /*删除分类*/
  removeCatagory(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'catagory/remove', data)
  }

  /*修改分类*/
  updataCatagory(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'catagory/updata', data)
  }

  /*新增文章*/
  addArtical(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'artical/add', data)
  }

  /*分页获取文章*/
  getArtical(data) {
    return axios.post(baseUrl + 'artical/get', data)
  }

  /*编辑文章*/
  editorArtical(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'artical/editor', data)
  }

  /*删除文章*/
  deleteArtical(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'artical/delete', data)
  }

  /*根据分类获取文章*/

  getArticalByCatagory(data) {
    return axios.post(baseUrl + 'artical/getByCatagory', data)
  }

  /*文章阅读数统计*/

  articalViewsAdd(data) {
    return axios.post(baseUrl + 'artical/viewsAdd', data)
  }

  /*新增歌单*/

  addMusicList(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'music/add', data)
  }

  /*获取歌单*/

  getMusicList(data) {
    return axios.post(baseUrl + 'music/get', data)
  }

  /*删除歌单*/

  removeMusicList(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'music/remove', data)
  }


  /*添加demo*/
  addDemo(data) {
    return axios.post(baseUrl + 'demo/upload', data)
  }

  /*获取Demo*/
  getDemo(data) {
    return axios.post(baseUrl + 'demo/get', data)
  }

  /*删除Demo*/

  deleteDemo(data1) {
    let data = data1;
    data.token = sessionStorage.token;
    return axios.post(baseUrl + 'demo/delete', data)
  }

  /*根据ID获取Demo*/

  getDemoById(data){
    return axios.post(baseUrl + 'demo/getById', data)
  }

}


export default new Api()
