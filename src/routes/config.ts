import loadable from '@/libs/loadable'
const menus:any = {
    menus: [
        // 菜单相关路由
        { key: '/app/home', title: '首页', icon: 'mobile', component: loadable(() => import('@/pages/home/index')) },
        { key: '/app/mine', title: '我的', icon: 'mobile', component: loadable(() => import('@/pages/mine/index'))},
    ],
    others: [
        { key: '/setting', title: '设置', icon: 'mobile', component: loadable(() => import('@/pages/mine/setting/index'))},
    ],
};

export default menus;
