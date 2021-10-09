import React,{useEffect,useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile'

let homecheapflight = inject("appState")(observer(((props:any)=>{

    return (
        <div className={'home'}>
            <Button>机票首页</Button>
        </div>
    );
})))

export default homecheapflight;
