import React from 'react';
import {  Layout, Menu, Icon, Switch } from 'antd';
import {NavLink, withRouter} from 'react-router-dom';
import './menu.css';
import menuData from '../../store/menu';
import Blog from '../../page/blog/index';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

@withRouter
class MenuList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      theme: 'dark',
      current: '1',
      menuData,
    }
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  render() {
    return (
      <React.Fragment>
        <Sider theme={this.state.theme} trigger={null} collapsible collapsed={this.props.collapsed}>
          <div className="logo" />
          <p className="themeChecked">
            <Switch
              checked={this.state.theme === 'dark'}
              onChange={(val)=>this.changeTheme(val)}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            /></p>
          <Menu
              theme={this.state.theme}
              mode="inline"
              inlineCollapsed={this.state.collapsed}
              defaultSelectedKeys={['0']}
              style={{minHeight:'90vh'}}
            >
            {
              this.state.menuData.map((item,index)=>{
                return (
                  item.items.length>0?
                  <SubMenu key={index} onClick={(e,val)=>{console.log(e,val)}} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                    {
                      item.items.map((val)=>{
                        return (<Menu.Item key={Math.random()}><NavLink to={item.path} exact activeClassName="active">{val}</NavLink></Menu.Item>)
                      })
                    }
                  </SubMenu>:<Menu.Item key={index}><NavLink to={item.path} exact activeClassName="active"><Icon type={item.icon}  /><span>{item.title}</span></NavLink></Menu.Item>
                )
              })
            }
            </Menu>
        </Sider>
      </React.Fragment>
    );
  }
}

export default MenuList;