import React from 'react';
import './loading.less';
class Loading extends React.Component {
    render () {
        return (
            // 自己封装全局loading
            //  {/* 全局的loading组件，也可放在public/index.html与root同级，显示隐藏在axios/index请求中控制 */}

            <div className="ajax-loading" id="ajaxLoading" style={{display: 'none'}}>
                <div className="overlay"></div>
                <div className="loading">
                    <img src="https://media.number-7.cn/ebike-h5/static/images/common/loading.gif" alt="" />
                    <span>加载中，请稍后...</span>
                </div>
            </div>
        )
    }
}
export default Loading;