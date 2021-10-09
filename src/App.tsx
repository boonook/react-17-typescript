import {useEffect,useState} from 'react'
import {
  AppOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { Route, Switch } from 'react-router-dom';
import { Badge, TabBar } from 'antd-mobile'
import Home from '@/pages/home/index';
import Mine from '@/pages/mine/index';
import './App.less';
import history from '@/libs/history'
function App() {
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
    history.replace(activeKey);
  }

  useEffect(()=>{
    history.replace(activeKey);
    let heights = document.getElementById("TabBar")?.clientHeight;
    setHeight(heights);
    window.addEventListener('resize',function(){
      let height = document.getElementById("TabBar")?.clientHeight;
      setHeight(height);
    })
  },[activeKey])

  return (
    <div className="App" id="App" style={{height:"calc(100% - "+height+"px)"}}>
      <div>
        <Switch>
            <Route path="/app/home" component={Home} />
            <Route path="/app/mine" component={Mine} />
        </Switch>
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
}

export default App;
