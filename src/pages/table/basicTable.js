import React from 'react';
import { Card, Table, Modal, Button, message , Spin} from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils';
export default class BasicTable extends React.Component{

    state={
        dataSource2:[],
        // antd的loading
        loading:false,
        //自定义全局loading，是否显示
        isShowLoading:false,
    }

    params = {
        page:1
    }

    componentDidMount(){
        const data = [
            {
                id:'0',
                username:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                username: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                username: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        data.map((item,index)=>{
            item.key = index;
        })
        this.setState({
            dataSource: data
        })
        this.request();
    }

    // 动态获取mock数据
    request = ()=>{
        let _this = this;
        this.setState({
            loading:true
        })
        axios.ajax({
            url:'/table-list',
            data:{
                params:{
                    page:this.params.page
                },
                isShowLoading:this.state.isShowLoading
            }
        }).then((res)=>{
            if(res.code == 0){
                //点击行选中radio，key值要这样指定（key值从0开始，对应第一行，以此类推）
                res.result.map((item, index) => {
                    item.key = index;
                })

                this.setState({
                    dataSource2:res.result,
                    selectedRowKeys:[],
                    selectedRows:null,
                    // 自己重新封装分页组件
                    pagination: Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                },()=>{
                    //隐藏loading
                    this.setState({
                        loading:false,
                    })
                })
            }
        })
    }

//点击行 获取对应行内信息
    onRowClick = (record,index)=>{
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名：${record.username},用户爱好：${record.interest}`
        })
        this.setState({
            //将选中id和对应行信息保存到state
            selectedRowKeys:selectKey,
            selectedItem: record
        })
    }
// 点击按钮 获取对应行key值
    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    // checkbox多选执行删除动作
    handleDelete = (()=>{
        let rows = this.state.selectedRows;
        let ids = [];
        //获取选中的id
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    })

    render(){
        const columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'username',
                dataIndex: 'username'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                //对值进行重新渲染显示
                render(sex){
                    return sex ==1 ?'男':'女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state){
                    let config  = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                // console.log(selectedRowKeys,selectedRows)
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
                {/* 加载loading */}
                    <Spin tip="Loading..." spinning={this.state.loading} style={{marginTop:50}}>
                        <Table
                            bordered
                            columns={columns}
                            dataSource={this.state.dataSource2}
                            //分页 defaultCurrent当前页 pageSize:每页条数（默认10）
                            pagination={{defaultCurrent:1,total:20,pageSize:10}}
                        />
                    </Spin>
                </Card>
                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        //分页 defaultCurrent当前页 pageSize:每页条数（默认10）
                        pagination={{defaultCurrent:1,total:20,pageSize:10,showQuickJumper:true}}
                    />
                </Card>
                <Card title="Mock-多选/删除" style={{ margin: '10px 0' }}>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Spin tip="Loading..." spinning={this.state.loading} style={{marginTop:50}}>
                        <Table
                            bordered
                            rowSelection={rowCheckSelection}
                            columns={columns}
                            dataSource={this.state.dataSource2}
                            pagination={{defaultCurrent:1,total:20,pageSize:10,showQuickJumper:true}}
                        />
                    </Spin>
                </Card>
                <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        // 使用自己封装的分页组件，基本还是和antd一样，前面的分页使用antd提供的
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}