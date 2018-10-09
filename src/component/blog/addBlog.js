import React from 'react';
import { Form, Input,  DatePicker, Row, Col, Button, Select} from 'antd';
import EditConvert from '../../component/editorConvert/EditorConvert';
import '../../axios/intercept';
import axios from '../../axios/axios';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
class AddBlog extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            title:'',
            author:'',
            mainContent:'',
            time:'',
            editContent:'',
            userInfo:[]
        }
    }
    componentDidMount () {
        axios.getUserInfo().then((res)=>{
            let userInfo = res.data.data;
            if(res.status === 200){
                this.setState({
                    userInfo,
                    author: userInfo[0].user
                })
            }
        })
    }
    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
              return;
            }
            let {userInfo,...formInfo} = this.state;
            axios.addArticle(formInfo).then((res)=>{
                let result = res.data;
                if(res.status === 200 && result.status === 0){
                    this.setState({
                        author:'',
                        mainContent:'',
                        time:'',
                        editContent:'',
                    })
                }
            })
        })
    }

    inputValue (type,e) {
        this.setState({
            [type]:e.target.value
        })
    }
    inputDate (val,dateString) {
        // console.log(val,dataString);
        this.setState({
            time:dateString
        })
    }
    selectChange (author) {
        this.setState({
            author
        })
    }
    editContentChange (editContent) {
        this.setState({
            editContent
        })
    }
      render() {
        // const { editorState } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12},
        };
        const formAuthorLayout = {
            labelCol: { span: 3,offset:3 },
            wrapperCol: { span: 10},
        };
        const formDataLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10},
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        let userInfo = this.state.userInfo;
        return (
            <Form onSubmit={(e)=>this.handleSubmit(e)}>

                <FormItem
                    {...formItemLayout}
                    label="文章标题"
                    >
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true, message: 'Please input artile title',
                        }],
                    })(
                        <Input onChange={(e)=>{this.inputValue('title',e)}}/>
                    )}
                </FormItem>
                <Row>
                    <Col span={12}>
                        <FormItem
                            {...formAuthorLayout}
                            label="作者"
                            >

                            <Select value={this.state.userInfo[0]?this.state.userInfo[0].user:''} style={{ width: 120 }} onChange={()=>this.selectChange()}>
                                {
                                    this.state.userInfo.map((info)=>{
                                        return  <Option value={info.user} key={info._id}>{info.user}</Option>
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            {...formDataLayout}
                            label="选择日期"
                            >
                            {getFieldDecorator('date-picker', config)(
                                <DatePicker onChange={(value,dataString)=>this.inputDate(value,dataString)} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem
                    {...formItemLayout}
                    label="文章摘要"
                    >
                    {getFieldDecorator('main', {
                        rules: [{
                        required: true, message: 'Please input artile main content',
                        }],
                    })(
                        <Input onChange={(e)=>{this.inputValue('mainContent',e)}}/>
                    )}
                </FormItem>
                <Row>
                    <Col span = {22} offset={1}>
                    <p style = {{fontWeight:'blod'}}>文章内容:</p>
                        <EditConvert editContentChange = {(editContent)=>this.editContentChange(editContent)}/>
                    </Col>
                </Row>
                <FormItem {...tailFormItemLayout} style={{marginTop:'10px'}}>
                    <Button type="primary" htmlType="submit" onClick={(e)=>this.handleSubmit(e)}>发布</Button>
                </FormItem>
            </Form>
        )
    }
}
export default AddBlog;