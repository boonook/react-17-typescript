import loadable from '@/components/loadable';
export default [
  { key: '/promotion/2021nationalday/home', title: '国庆惠玩', icon: 'mobile', component: loadable(() => import('./pages/home/index'))},
  { key: '/promotion/2021nationalday/records', title: '国庆惠玩', icon: 'mobile', component: loadable(() => import('./pages/records/index'))},
  { key: '/promotion/2021nationalday/result', title: '国庆惠玩', icon: 'mobile', component: loadable(() => import('./pages/result/index'))},
  { key: '/promotion/2021nationalday/rules', title: '国庆惠玩', icon: 'mobile', component: loadable(() => import('./pages/rules/index'))},
]
