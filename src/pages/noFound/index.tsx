import React,{useEffect,useState} from 'react';
import './noFound.less';
import {inject, observer} from "mobx-react";

let NoFound = inject("appState")(observer(((props:any)=>{
    document.title = '航班管家';
    const [time,setTime] = useState(5);
    useEffect(()=>{
        let timerID = setTimeout(()=>{
            goPage()
        },1000)
        if(time===0){
            clearTimeout(timerID);
            props.history.replace('/');
        }
    })

    function goPage() {
        if(time>0){
            setTime(time-1);
        }
    }

    function onGoHome() {
        goPage()
    }

    return (
        <div className={'noFound'}>
            <h1 className={'noFoundTitle'}>404</h1>
            <p onClick={onGoHome} style={{ "padding":"0 1.5rem"}} className={'noFoundBtn'}>{time}秒之后返回首页</p>
        </div>
    );
})))

export default NoFound;
