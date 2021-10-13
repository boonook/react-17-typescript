import React,{useEffect,useState} from 'react';
import './login.less';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile';
import history from '@/libs/history';
import {getHomeList} from './serve'

let Login = inject("appState")(observer(((props:any)=>{
    useEffect(()=>{
       
    })

    function onLogin() {
        props.history.replace('/app')
    }

    function onRequest(){
        getHomeList({}).then(res=>{
            debugger
        })
    }

    return (
        <div className={'login'}>
            <h1  style={{fontSize:'14px',margin:0}} className={'noFoundTitle'}>Login</h1>
            <Button onClick={()=>{onLogin()}}>登录</Button>
            <Button onClick={()=>{onRequest()}}>测试http请求</Button>
        </div>
    );
})))

export default Login;
