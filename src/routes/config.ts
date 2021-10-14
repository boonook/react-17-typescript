import loadable from '@/libs/loadable';
import { lazy } from 'react';
import {routes} from '@/pages/project/promotion/router';
import {cheapflightRoutes} from '@/pages/project/cheapflight/router';
const Home = lazy(() => import('@/pages/home/index'));
const Mine = lazy(() => import('@/pages/mine/index'));
const MineSetting = lazy(() => import('@/pages/mine/setting/index'));
const Login = lazy(() => import('@/pages/auth/login'));
const menus:any = {
    menus: [
        ////存放底部菜单导航的
        //底部菜单导航的key以/app/开头
        { key: '/app/home', title: '首页', icon: 'mobile', component:Home},
        { key: '/app/mine', title: '我的', icon: 'mobile', component:Mine},
    ],
    others: [
        //非底部导航菜单不得已/app/开头
        { key: '/setting', title: '设置', icon: 'mobile', component:MineSetting},
        { key: '/login', title: '登录', icon: 'mobile', component: Login},
    ],
};

menus.others = [...menus.others,...routes(),...cheapflightRoutes()]

export default menus;
