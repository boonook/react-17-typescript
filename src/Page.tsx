import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '@/pages/auth/login';
import NotFound from '@/pages/noFound/index';
import history from '@/libs/history'
import App from './App';
import DocumentTitle from 'react-document-title';
import queryString from 'query-string';
import routesConfig from '@/routes/config';
////需要出离当用户登陆后我们将login重定向到首页，放置用户在登陆状态下，通过修改url直接跳转到登陆界面中去
////在404界面我们也要做相应的处理判断用户是否登陆，如果登陆将其重定向到主页，如果没有登陆重定向到登陆界面中去
function Page() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" push />} />
                <Route path="/login" component={Login} />
                <Route path="/app" component={(props:any)=><App {...props}/>} />
                {Object.keys(routesConfig).map(key=>
                    routesConfig[key].map((r:any)=>{
                        if(key!='menus'){
                            console.log('123123213',key);
                            const route = (r:any) =>{
                                const Component = r.component;
                                return (
                                    <Route key={r.route||r.key}
                                        exact
                                        path={r.route||r.key}
                                        render={props =>{
                                            const reg = /\?\S*/g;
                                            // 匹配?及其以后字符串
                                            const queryParams = window.location.hash.match(reg);
                                            // 去除?的参数
                                            const {params} = props.match;
                                            Object.keys(params).forEach(key => {
                                                params[key] =
                                                    params[key] && params[key]?.replace(reg, '');
                                            });
                                            props.match.params = {...params};
                                            const merge = {
                                                ...props,
                                                query: queryParams
                                                    ? queryString.parse(queryParams[0])
                                                    : {},
                                            };
                                            ///重新包装组件
                                            const wrappedComponent = (
                                                <DocumentTitle title={r.title}>
                                                    <Component {...merge} />
                                                </DocumentTitle>
                                            );
                                            return wrappedComponent
                                            /***
                                             * isLogin判断用户是否有菜单权限或者是否登陆如果没有进入requireLogin()退出到404界面或者登陆界面
                                             * ***/
                                            ///return isLogin?wrappedComponent:requireLogin(wrappedComponent)
                                        }}
                                    />
                                )
                            };
                            return r.component?route(r):r.subs.map((r:any)=>route(r))
                        }
                    })
                )}
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default Page;