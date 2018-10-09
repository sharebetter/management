import React from 'react';

export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+this.dataFormate(date.getHours())+':'+this.dataFormate(date.getMinutes())+':'+this.dataFormate(date.getSeconds());
    },
    dataFormate (time) {
        if(time<10){
            return `0${time}`;
        }else{
            return time;
        }
    },
    //自己重新封装分页组件
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page || 1,
            pageSize:data.result.page_size || 10,
            total: data.result.total_count || 20,
            showTotal:()=>{
                // return `共${data.result.total_count}条`
                return `共20条`
            },
            showQuickJumper:true
        }
    },
}