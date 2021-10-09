export const routes=()=>{
  const partnerFiles = require.context('./pages', true, /routes.ts$/);
  let routers:any=[];
  partnerFiles.keys().forEach((key:any) => {
    routers = [...routers, ...partnerFiles(key).default]
  });
  return routers;
}
