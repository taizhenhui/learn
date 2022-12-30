import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Films = lazy(()=>import('../views/Films'))
const Cinemas = lazy(()=>import('../views/Cinemas'))
const Center = lazy(()=>import('../views/Center'))
const Detail = lazy(()=>import('../views/Detail'))
const NowPlaying = lazy(()=>import('../views/films/NowPlaying'))
const Comingsoon = lazy(()=>import('../views/films/Comingsoon'))
// import Films from '../views/Films'
// import Cinemas from '../views/Cinemas'
// import Center from '../views/Center'
// import Detail from '../views/Detail'
// import NowPlaying from '../views/films/NowPlaying'
// import Comingsoon from '../views/films/Comingsoon'
const router = [
  {
    path: '/',
    element: <Films />,
    children: []
  },
  {
    path: '/cinemas',
    element: <Cinemas />,
    children: [
      {
        path: '',
        element: <Navigate to={'nowPlaying'} />,
        children: []
      },
      {
        path: 'nowPlaying',
        element: <NowPlaying />,
        children: []
      },
      {
        path: 'comingsoon',
        element: <Comingsoon />,
        children: []
      },
    ]
  },
  {
    path: '/center',
    element: <Center />,
    children: []
  },
  {
    path: '/detail',
    element: <Detail />,
    children: []
  },
]

export default router