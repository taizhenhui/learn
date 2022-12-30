
import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom';

// import { Routes, Route, Navigate, Outlet } from 'react-router-dom'


import Tabbar from './components/Tabbar';
// import Films from './views/Films'
// import Cinemas from './views/Cinemas'
// import Center from './views/Center'
// import NowPlaying from './views/films/NowPlaying'
// import Comingsoon from './views/films/Comingsoon';
// import Detail from './views/Detail';
import IndexRouter from './router/IndexRouter';
function App() {

  return (
    <>
    <Suspense fallback={<>loading</>}>
      {useRoutes(IndexRouter)}
      <Tabbar/>
    </Suspense>
    </>
  );
}

export default App;
