import React from 'react'
import { Row, Col, Breadcrumb } from "antd"
import { NavLink, withRouter } from 'react-router-dom';
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'
class Header extends React.Component{
    state={

    }
    componentWillMount(){
        this.setState({
            userName:'shareBetter'
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIData();
    }

    getWeatherAPIData(){
        let city = '厦门';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status == 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }
    render(){
        // const { menuName, menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={15} className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        <span>Manager Server通用管理系统</span>
                    </Col>
                    <Col span={9}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="6" className="breadcrumb-title">
                        <Breadcrumb className="breadcrumb-title-link">
                            <Breadcrumb.Item><NavLink to="/">首页</NavLink></Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span="18" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt="" />
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(Header);