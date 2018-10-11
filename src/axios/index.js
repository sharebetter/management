import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }
    static ajax(options){
        //自己定义的全局loading,只要进行ajax请求就触发 isShowLoading由用户决定是否要显示loading
        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = ' https://easy-mock.com/mock/5bbb0f2a47fcad6715a0a7a7/management';
        return new Promise((resolve,reject)=>{
            axios({
                url: options.url,
                method: options.method || 'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    //自己定义的全局loading, 进行关闭
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200'){
                    let res = response.data;
                    if (res.code == '0'){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
                //axios请求失败或是超时都会被catch
            }).catch(err=>{
                //关闭loading页面
                if (options.data && options.data.isShowLoading !== false) {
                    //自己定义的全局loading, 进行关闭
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                options.method === 'post'?
                Modal.error({
                    title:"提示",
                    content:'数据提交超时'
                }):
                Modal.error({
                    title:"提示",
                    content:'数据获取超时,启用本地mock数据'
                })
                // mock数据获取失败时，用本地mock数据代替
                switch(options.url){
                    case 'user-list':
                        return resolve(require('../mock/user-list.js'));
                        break;
                    case '/order-list':
                        return resolve(require('../mock/order-list.js'));
                        break;
                    case '/table-list':
                        return resolve(require('../mock/table-list.js'));
                        break;
                    case '/open_city':
                        return resolve(require('../mock/open-city.js'));
                        break;
                }

            })
        });
    }
}