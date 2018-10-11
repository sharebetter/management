import React from 'react';
import { Table } from 'antd';

class ETable extends React.Component {
    state = {}

    //获取行内信息
    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection;
        // debugger;
        if(rowSelection === 'checkbox'){
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedIds = this.props.selectedIds;
            let selectedItem = this.props.selectedItem || [];

            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i === -1) {//避免重复添加
                    selectedIds.push(record.id)
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index]
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem || [],selectedIds);
        }else{
            let selectKey = [index];
            const selectedRowKeys = this.props.selectedRowKeys;
            if (selectedRowKeys && selectedRowKeys[0] === index){
                return;
            }
            this.props.updateSelectedItem(selectKey,[record] || {});
        }
    }
    // 点击按钮 获取对应行key值
    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        let rowSelection = this.props.rowSelection;
        const selectedIds = [];
        if(rowSelection === 'checkbox'){
            selectedRows.map((item)=>{
                selectedIds.push(item.id);
            });
            // this.setState({
            //     selectedRowKeys,
            //     selectedIds:selectedIds,
            //     selectedItem: selectedRows[0]
            // });
        }
        // selectedRowKeys, selectedRows，selectedIds 没有对应
        // 通过排序使三者按照大小排序，相互对应
        selectedRowKeys = selectedRowKeys.sort(this.sortNumber);
        this.props.updateSelectedItem(selectedRowKeys,selectedRows,selectedIds);
    }
    sortNumber(a,b)
    {
        return a - b
    }
    onSelectAll = (selected, selectedRows, changeRows) => {
        // debugger;
        let selectedIds = [];
        let selectKey = [];
        selectedRows.forEach((item,i)=> {
            selectedIds.push(item.id);
            selectKey.push(i);
        });
        this.props.updateSelectedItem(selectKey,selectedRows || [],selectedIds);
    }

    render () {
        const { selectedRowKeys } = this.props;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect:(record, selected, selectedRows)=>{
                console.log('...')
            },
            onSelectAll:this.onSelectAll
        };
        let row_selection = this.props.rowSelection;
        // 当属性未false或者null时，说明没有单选或者复选列
        if(row_selection===false || row_selection === null){
            row_selection = false;
        }else if(row_selection === 'checkbox'){
            //设置类型未复选框
            rowSelection.type = 'checkbox';
        }else{
            //默认未单选
            row_selection = 'radio';
        }
        return (
            <Table
                className="card-wrap page-table"
                bordered
                {...this.props}
                rowSelection={rowSelection}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            this.onRowClick(record, index);
                        }
                    };
                }}
            />
        )
    }
}
export default ETable;