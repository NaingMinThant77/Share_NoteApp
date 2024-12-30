import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './assets/layouts/Main';
import Create from './assets/pages/Create';
import Edit from './assets/pages/Edit';
import Index from './assets/pages/Index';
import Details from './assets/pages/Details';
import Register from './assets/pages/Register';
import Login from './assets/pages/Login';

import isLoginLoader from "./utils/isLogin"

const router = createBrowserRouter([
  {
    path: "/", element: <Main />, children: [
      { index: true, element: <Index /> },
      { path: "/create", loader: isLoginLoader, element: <Create /> },
      { path: "/edit/:id", loader: isLoginLoader, element: <Edit /> },
      { path: "/notes/:id", element: <Details /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ]
  }
])

const App = () => {
  return (
    <><RouterProvider router={router} /></>
  )
}

export default App
