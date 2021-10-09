import React,{useEffect,useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile'

let home2021nationalday = inject("appState")(observer(((props:any)=>{
    const [time,setTime] = useState(5)
    useEffect(()=>{
        
    })

    return (
        <div className={'home'}>
            <Button>活动首页</Button>
        </div>
    );
})))

export default home2021nationalday;
