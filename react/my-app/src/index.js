import React from 'react'
import { createRoot } from 'react-dom/client';

import App from './01-base/17-函数式组件props'
// import App from './01-base/12-select-card'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <App />
);