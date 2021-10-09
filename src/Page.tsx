import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '@/pages/auth/login';
import NotFound from '@/pages/noFound/index';
import history from '@/libs/history'
import App from './App'
////需要出离当用户登陆后我们将login重定向到首页，放置用户在登陆状态下，通过修改url直接跳转到登陆界面中去
////在404界面我们也要做相应的处理判断用户是否登陆，如果登陆将其重定向到主页，如果没有登陆重定向到登陆界面中去
function Page() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" push />} />
                <Route path="/login" component={Login} />
                <Route path="/app" component={(props:any)=><App {...props}/>} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default Page;