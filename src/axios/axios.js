import axios from 'axios'

// 在这里增加拦截器的功能  拦截发送请求和响应请求


export default {
    addArticle (params) {
       return axios.post('/admin/addArticle',params);
    },
    getUserInfo () {
        return axios.get('/admin/userInfo',{params:{}});
    }
}