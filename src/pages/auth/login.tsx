import {useEffect} from 'react';
import './login.less';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile';
<<<<<<< HEAD
import {isElectron,ipcRenderer} from '@/libs/envElectron'
=======
import {isElectron,ipcRenderer} from '@/libs/EnvElectron'
>>>>>>> 59a792a338c2f5268b720d7d0128d3d1ba906d23
import {getHomeList} from './serve'
import {CloseOutline} from 'antd-mobile-icons'

let Login = inject("appState")(observer(((props:any)=>{
    useEffect(()=>{
<<<<<<< HEAD
        if (isElectron) {
            ipcRenderer.send('login');
=======
        if(isElectron){
            ipcRenderer.send('login-window');
>>>>>>> 59a792a338c2f5268b720d7d0128d3d1ba906d23
        }
    },[])

    function onLogin() {
        props.history.replace('/app');
<<<<<<< HEAD
        if (isElectron) {
            ipcRenderer.send('other');
=======
        if(isElectron){
            ipcRenderer.send('other-window');
>>>>>>> 59a792a338c2f5268b720d7d0128d3d1ba906d23
        }
    }

    function onRequest(){
        getHomeList({}).then((res:any)=>{
            debugger
        })
    }

    ////关闭窗口
    function onQuit(){
        ipcRenderer.send('closeWindow');
    }

    return (
        <div className={'login'}>
            <div style={{textAlign:'right'}}><CloseOutline onClick={()=>{onQuit()}} fontSize={24}/></div>
            <h1  style={{fontSize:'14px',margin:0}} className={'noFoundTitle'}>Login</h1>
            <Button onClick={()=>{onLogin()}}>登录</Button>
            <Button onClick={()=>{onRequest()}}>测试http请求</Button>
        </div>
    );
})))

export default Login;
