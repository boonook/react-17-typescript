import React,{useState} from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import queryString from 'query-string';
import routesConfig from './config';
import AllComponents from '@/pages/index';
import {observer,inject} from 'mobx-react';

let CRouter = inject("appState")(observer(((props:any)=>{
    return (
        <Switch>
            {Object.keys(routesConfig).map(key=>
                routesConfig[key].map((r:any)=>{
                    const route = (r:any) =>{
                        const Component = AllComponents[r.component];
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
                })
            )}
            <Route render={() => <Redirect to="/404"/>}/>
        </Switch>
    );
})))

export default CRouter;
