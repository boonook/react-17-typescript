import {useEffect,useState} from 'react'
import {
  AppOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { Badge, TabBar } from 'antd-mobile'
import {inject, observer} from "mobx-react";
import {CloseOutline} from 'antd-mobile-icons';
import {ipcRenderer} from '@/libs/EnvElectron'
import './App.less';
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

  ////关闭窗口
  function onQuit(){
    ipcRenderer.send('closeWindow');
}

  return (
    <div className="App" id="App">
      <div className="bodybox" style={{height:"calc(100% - "+(height)+"px)",overflow:'hidden'}}>
        <Routes/> 
      </div>
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
