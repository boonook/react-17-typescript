import loadable from '@/libs/loadable';
import { lazy } from 'react';
export const cheapflightRoutes:any=()=>{
  let routers:any=[
    { key: '/cheapflight/home', title: '机票首页', icon: 'mobile', component: lazy(() => import('./peges/home/index'))},
  ];
  return routers;
}
