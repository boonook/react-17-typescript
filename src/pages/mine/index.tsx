import React,{useEffect,useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile'

let mine = inject("appState")(observer(((props:any)=>{
    const [time,setTime] = useState(5)
    useEffect(()=>{
        
    })

    function onSetting(){
        props.history.push('/setting');
    }

    return (
        <div className={'home'}>
            <Button onClick={() => onSetting()}>前往设置界面</Button>
        </div>
    );
})))

export default mine;
