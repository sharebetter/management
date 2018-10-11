import React from 'react';
import { Card, Button, Table, Form, Select, Modal, DatePicker, message} from 'antd';
import moment from 'moment';
import axios from '../../axios'
import Utils from '../../utils/utils'
// import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component{

    state={}
    params = {
        page: 1
    }
    componentDidMount(){
        this.requestList()
    }
    // 默认请求我们的接口数据
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url: '/order-list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let list = res.result;
            //点击行选中radio，key值要这样指定
            list.map((item, index) => {
                item.key = index;
            })
            this.setState({
                list:list,
                selectedRowKeys:[],
                selectedRows:null,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }
    //获取行内信息
    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: [record]
        })
    }
    // 点击按钮 获取对应行key值
    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({
            selectedRowKeys,
            selectedItem: selectedRows
        })
    }
    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '订单信息',
                content: '请先选择一条订单'
            })
            return;
        }
        if(item[0].status === 0){
            item[0].status = "待发货"
        }else{
            item[0].status = item[0].status===1?"派件中":"待签收"
        }
        Modal.info({
            title: '订单信息',
            content: `
            订单编号:${item[0].order_sn} ,
            用户名:${item[0].user_name} ,
            手机号:${item[0].mobile} ,
            状态:${item[0].status} ,
            金额:${item[0].user_pay} ,
            `
        })
    }
    // 订单结束确认
    handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '订单信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        if(item[0].status === 0){
            item[0].status = "待发货"
        }else{
            item[0].status = item[0].status===1?"派件中":"待签收"
        }
        Modal.confirm({
            title: '订单信息',
            content: `
                订单编号:${item[0].order_sn} ,
                用户名:${item[0].user_name} ,
                手机号:${item[0].mobile} ,
                状态:${item[0].status} ,
                金额:${item[0].user_pay} ,
            `,
            onOk() {
                message.success('订单结束成功')
            },
            onCancel() {
                // message.error('取消')
            },
        })
    }
    render (){
        const columns = [
            {
                title:'订单编号',
                key:'orderId',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                key:'cardId',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                key:'user_name',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                key:'mobile',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                key:'distance',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                key:'total_time',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key:"status",
                render (status) {
                    if(status === 0){
                        return '待发货'
                    }else{
                        return status===1? '派送中':"待签收"
                    }
                }
            },
            {
                title: '开始时间',
                key:"start_time",
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                key:"end_time",
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                key:"total_fee",
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                key:"user_pay",
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
        )
    }
}
class FilterForm extends React.Component{
    state={
        endOpen:false
    }
    //城市查询
    citySearch () {
        // console.log(JSON.stringify(this.props.form.getFieldsValue()))
    }
    // 重置
    citySearchReset () {
        this.props.form.resetFields();
    }
    //自动打开end_tiem
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city',{
                            initialValue: '1',
                        })(
                            <Select
                                style={{width:80}}
                                placeholder="全部"
                            >
                                <Option value="all">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        ///form标签内时间选择器默认时间的写法
                        getFieldDecorator('start_time',{
                            initialValue: moment(new Date()),
                            // defaultValue:'2018-10-1 12:00:00'
                        })(
                            <DatePicker style={{width:170}} showTime format="YYYY-MM-DD HH:mm:ss" onOpenChange={this.handleStartOpenChange}/>
                        )
                    }
                </FormItem>
                <FormItem label="~" colon={false}>
                    {
                        getFieldDecorator('end_time',{
                            initialValue: null,
                            // initialValue: moment('2018-10-01 12:00:00', 'YYYY-MM-DD HH:mm:ss'),
                        })(
                            <DatePicker style={{width:170}} showTime open={this.state.endOpen} format="YYYY-MM-DD HH:mm:ss" onOpenChange={this.handleEndOpenChange} />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('order_status',{
                            initialValue: 'ready',
                        })(
                            <Select
                                style={{ width: 80 }}
                                placeholder="订单状态"
                            >
                                <Option value="ready">待发货</Option>
                                <Option value="sending">运送中</Option>
                                <Option value="receive">待收货</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={()=>{this.citySearch()}}>查询</Button>
                    <Button onClick={()=>{this.citySearchReset()}}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);