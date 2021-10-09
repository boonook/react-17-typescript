import React,{useEffect,useState} from 'react';
import {inject, observer} from "mobx-react";
import {ActionSheet,Button} from 'antd-mobile';
import './index.less'
let setting = inject("appState")(observer(((props:any)=>{
    const [visible, setVisible] = useState(false);
    const actions:any = [
        { text: '确定', key: 'sure',danger: true, },
    ]
    useEffect(()=>{
        
    })

    function onTab(value:any){
        console.log(value);
        if(value.key=='sure'){
            props.history.replace('/login')
        }
    }

    return (
        <div className={'home'}>
            <Button onClick={() => setVisible(true)}>取消按钮和额外描述</Button>
            <ActionSheet
                extra='你确定要退出登录吗？'
                cancelText='取消'
                visible={visible}
                actions={actions}
                className={'ceshi'}
                onAction={(value:any) =>onTab(value)}
                onClose={() => setVisible(false)}
            />
        </div>
    );
})))

export default setting;
