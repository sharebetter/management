import React from 'react';
import {  Layout, Icon} from 'antd';
// 引入react-router组件
import { Route, Switch} from 'react-router-dom';
import Home from '../../page/home/index';
import Blog from '../blog/addBlog';
const { Header, Content } = Layout;

function Category () {
    return 'Category';
}
function Tags () {
    return 'Tags';
}
function Mine () {
    return 'Mine';
}
class Container extends React.Component {

  render() {
    return (

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
                <Route path='/home' component={Home} exact />
                <Route path='/blog' component={Blog} />
                <Route path='/category' component={Category} />
                <Route path='/tags' component={Tags} />
                <Route path='/mine' component={Mine} />
                <Route component={Home} />
            </Switch>
          </Content>
        </Layout>
    );
  }
}

export default Container;