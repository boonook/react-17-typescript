import React,{useEffect,useState} from 'react';
import './login.less';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile';
import history from '@/libs/history'

let Login = inject("appState")(observer(((props:any)=>{
    useEffect(()=>{
       
    })

    function onLogin() {
        history.replace('/app');
    }

    return (
        <div className={'login'}>
            <h1  style={{fontSize:'14px',margin:0}} className={'noFoundTitle'}>Login</h1>
            <Button onClick={()=>{onLogin()}}>登录</Button>
        </div>
    );
})))

export default Login;
