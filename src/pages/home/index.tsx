import React,{useEffect,useState} from 'react';
import {inject, observer} from "mobx-react";

let home = inject("appState")(observer(((props:any)=>{
    const [time,setTime] = useState(5)
    useEffect(()=>{
        
    })

    return (
        <div className={'home'}>
            <h1  style={{fontSize:'14px',margin:0}} className={'noFoundTitle'}>Home</h1>
        </div>
    );
})))

export default home;
