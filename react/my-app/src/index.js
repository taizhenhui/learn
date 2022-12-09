import React from 'react'
import { createRoot } from 'react-dom/client';

import App from './02-advanced/11-插槽抽屉'
// import App from './01-base/12-select-card'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <App />
);