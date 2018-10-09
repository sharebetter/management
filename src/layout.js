import React from 'react'
import { Row,Col } from 'antd';
import Header from './components/Header'
import Footer from './components/Footer'
// import { connect } from 'react-redux'
import NavLeft from './components/NavLeft'
import Loading from './components/Loading'
import './style/common.less'
class MyLayout extends React.Component{

    render(){
        return (
            <Row className="container">
                <Col span="4" className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span="20" className="main">
                    <Header/>
                    {/* 全局的loading组件，也可放在public/index.html与root同级，显示隐藏在axios/index请求中控制 */}
                    <Loading />
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
}
export default MyLayout;