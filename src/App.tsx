import {useEffect,useState} from 'react'
import {
  AppOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { Route, Switch } from 'react-router-dom';
import { Badge, TabBar } from 'antd-mobile'
import Home from '@/pages/home/index';
import Mine from '@/pages/mine/index';
import {inject, observer} from "mobx-react";
import './App.less';
import history from '@/libs/history';
import routesConfig from '@/routes/config';
import Routes from '@/routes/index';
let App:any = inject("appState")(observer(((props:any)=>{
  const [activeKey, setActiveKey] = useState('/app/home');
  const [height, setHeight] = useState<any>(50)
  const tabs = [
    {
      key: '/app/home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/app/mine',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ]

  function onTabChange(value:any){
    setActiveKey(value);
    props.history.replace(activeKey);
  }

  useEffect(()=>{
    props.history.replace(activeKey);
    let heights = document.getElementById("TabBar")?.clientHeight;
    setHeight(heights);
    window.addEventListener('resize',function(){
      let height = document.getElementById("TabBar")?.clientHeight;
      setHeight(height);
    })
    Object.keys(routesConfig).map((key:any)=>
      routesConfig[key].map((r:any)=>{
        console.log(r);
      })
    )
  },[activeKey])

  return (
    <div className="App" id="App" style={{height:"calc(100% - "+height+"px)",paddingBottom:height+"px"}}>
      <Routes/> 
      <div className="TabBar" id="TabBar">
        <TabBar onChange={(value)=>{onTabChange(value)}}>
          {tabs.map(item => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
            />
          ))}
        </TabBar>
      </div>
    </div>
  );
})))

export default App;
