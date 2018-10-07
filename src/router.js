import React from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Divider } from 'antd';
import App from './App';
import Home from './pages/home';
import Admin from './admin';
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import NoMatch from './pages/nomatch'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'

export default class ERouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <App>
                    <Admin>
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
                            <Route component={NoMatch} />
                        </Switch>
                    </Admin>
                </App>
            </HashRouter>
        )
    }
}