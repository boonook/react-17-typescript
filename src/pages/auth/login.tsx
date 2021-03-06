import {useEffect} from 'react';
import './login.less';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile';
import {isElectron,ipcRenderer} from '@/libs/EnvElectron'
import {getHomeList} from './serve'
import {CloseOutline} from 'antd-mobile-icons'

let Login = inject("appState")(observer(((props:any)=>{
    useEffect(()=>{
        if (isElectron) {
            ipcRenderer.send('login');
            ////
            ipcRenderer.on('ping', (event:any, message:any) => {
                console.log('----------------------',message) // Prints 'whoooooooh!'，这里的message是object类型
            });
            ipcRenderer.on('ping2', (event:any, message:any) => {
                console.log('++++++++++++++++++++++++++++',message) // Prints 'whoooooooh!'，这里的message是object类型
            })
        }
    },[])

    function onLogin() {
        props.history.replace('/app');
        if (isElectron) {
            ipcRenderer.send('other');
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
            <h1  style={{fontSize:'14px',margin:0}} className={'noFoundTitle'}>Login</h1>
            <Button onClick={()=>{onLogin()}}>登录</Button>
            <Button onClick={()=>{onRequest()}}>测试http请求</Button>
        </div>
    );
})))

export default Login;
