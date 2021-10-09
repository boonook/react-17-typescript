import React,{useEffect,useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button} from 'antd-mobile'

let rules2021nationalday = inject("appState")(observer(((props:any)=>{

    return (
        <div className={'home'}>
             <Button>活动规则</Button>
        </div>
    );
})))

export default rules2021nationalday;
