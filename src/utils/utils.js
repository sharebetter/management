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
    }
}