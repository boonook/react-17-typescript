import loadable from '@/components/loadable';
export const cheapflightRoutes:any=()=>{
  let routers:any=[
    { key: '/cheapflight/home', title: '机票首页', icon: 'mobile', component: loadable(() => import('./peges/home/index'))},
  ];
  return routers;
}
