import ReactDOM from 'react-dom';
import React, { lazy, Suspense } from 'react'
import {Provider} from 'mobx-react'
import appState from '@/store'
import Page from './Page';
import * as serviceWorker from './serviceWorker';
import './index.less';
ReactDOM.render(
    <Provider appState={appState}>
      <Suspense fallback={<div className='loadingbox'>Loading</div>}>
        <Page />
      </Suspense>
    </Provider>,
  document.getElementById('root')
);
serviceWorker.register({});