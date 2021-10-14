import loadable from '@/libs/loadable';
import { lazy } from 'react';
export default [
  { key: '/promotion/2021nationalday/home', title: '国庆惠玩', icon: 'mobile', component: lazy(() => import('./pages/home/index'))},
  { key: '/promotion/2021nationalday/records', title: '国庆惠玩', icon: 'mobile', component: lazy(() => import('./pages/records/index'))},
  { key: '/promotion/2021nationalday/result', title: '国庆惠玩', icon: 'mobile', component: lazy(() => import('./pages/result/index'))},
  { key: '/promotion/2021nationalday/rules', title: '国庆惠玩', icon: 'mobile', component: lazy(() => import('./pages/rules/index'))},
]
