import Loadable from 'react-loadable';

export default (loader:any) => {
    return Loadable({
        loader,
        loading() {
            return <div className="outer">
            <div className="loader"></div>
          </div>
        },
    });
}