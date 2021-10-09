import Loadable from 'react-loadable';

export default (loader:any) => {
    return Loadable({
        loader,
        loading() {
            return <div>正在加载</div>
        },
    });
}