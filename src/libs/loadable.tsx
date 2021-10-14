import Loadable from 'react-loadable';

export default (loader:any) => {
    return Loadable({
        loader,
        loading() {
            return <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',width:'100%'}}>正在加载</div>
        },
    });
}