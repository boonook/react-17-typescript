import React,{useEffect,useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile'

let result2021nationalday = inject("appState")(observer(((props:any)=>{

    return (
        <div className={'home'}>
             <Button>活动结果页</Button>
        </div>
    );
})))

export default result2021nationalday;
