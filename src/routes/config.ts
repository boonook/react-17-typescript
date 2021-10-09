import loadable from '@/libs/loadable';
import {routes} from '@/pages/project/promotion/router';
import {cheapflightRoutes} from '@/pages/project/cheapflight/router'
const menus:any = {
    menus: [
        ////存放底部菜单导航的
        //底部菜单导航的key以/app/开头
        { key: '/app/home', title: '首页', icon: 'mobile', component: loadable(() => import('@/pages/home/index')) },
        { key: '/app/mine', title: '我的', icon: 'mobile', component: loadable(() => import('@/pages/mine/index'))},
    ],
    others: [
        //非底部导航菜单不得已/app/开头
        { key: '/setting', title: '设置', icon: 'mobile', component: loadable(() => import('@/pages/mine/setting/index'))},
        { key: '/login', title: '登录', icon: 'mobile', component: loadable(() => import('@/pages/auth/login'))},
    ],
};

menus.others = [...menus.others,...routes(),...cheapflightRoutes()]

export default menus;
