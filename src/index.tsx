import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'tachyons';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container!)

root.render( 
  <App />
);
registerServiceWorker();
