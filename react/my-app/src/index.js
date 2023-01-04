import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import App from './06-react-redux/App'
import { store, persistor } from './06-react-redux/redux/store';
// import App from './04-router/App'
// import App from './03-hooks/16-自定义hooks'
// import App from './02-advanced/27-swiper-组件'
// import App from './01-base/12-select-card'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);