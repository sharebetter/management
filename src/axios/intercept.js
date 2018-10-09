import React from 'react';

import axios from 'axios'
import {Spin} from 'antd'

// 在这里增加拦截器的功能  拦截发送请求和响应请求
axios.interceptors.request.use(function (config) {

  return config;
})

axios.interceptors.response.use(function (config) {
  return config;
})
