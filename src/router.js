import React from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Divider } from 'antd';
import App from './App';
import Home from './pages/home';
import MyLayout from './layout';
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import NoMatch from './pages/nomatch'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'

export default class ERouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <App>
                    <MyLayout>
                        <Switch>
                            <Route path='/' exact render={()=>{
                               return <Redirect  to="/home" />
                            }} />
                            <Route path='/home' component={Home} />
                            <Route path="/ui/buttons" component={Buttons} />
                            <Route path="/ui/modals" component={Modals} />
                            <Route path="/ui/loadings" component={Loadings} />
                            <Route path="/ui/notification" component={Notice} />
                            <Route path="/ui/messages" component={Messages} />
                            <Route path="/ui/tabs" component={Tabs} />
                            <Route path="/ui/gallery" component={Gallery} />
                            <Route path="/ui/carousel" component={Carousel} />
                            <Route path="/form/login" component={FormLogin} />
                            <Route path="/form/register" component={FormRegister} />
                            <Route path="/table/basic" component={BasicTable} />
                            <Route path="/table/high" component={HighTable} />
                            <Route component={NoMatch} />
                        </Switch>
                    </MyLayout>
                </App>
            </HashRouter>
        )
    }
}