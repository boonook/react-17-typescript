import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react'
import appState from '@/store'
import Page from './Page';
import * as serviceWorker from './serviceWorker';
import './index.less';
ReactDOM.render(
    <Provider appState={appState}>
        <Page />
    </Provider>,
  document.getElementById('root')
);
serviceWorker.register({});