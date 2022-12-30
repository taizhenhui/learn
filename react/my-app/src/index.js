import React from 'react'
import { createRoot } from 'react-dom/client';

import App from './05-redux/App'
// import App from './04-router/App'
// import App from './03-hooks/16-自定义hooks'
// import App from './02-advanced/27-swiper-组件'
// import App from './01-base/12-select-card'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <App />
);