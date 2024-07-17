import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './components/root/Root';
import Home from './pages/Home';
import ErrorPage from './components/ErrorPage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Overview from './pages/Overview';
import ProtectedRoutes from './ProtectedRoutes';
import AllTransactions from './pages/AllTransactions';
import ManageAccounts from './pages/ManageAccounts';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/",
      //   element: <Home/>,
      // },
      {
        path: "/",
        element: (
          // Check for token and redirect to overview if valid
          localStorage.getItem('usertoken') ? <Navigate to="/overview" /> : <Home />
        ),
      },
      {
        path: "/registration",
        element: <Registration/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },

      {
        path: "/overview",
        element: (
          // Check for token and redirect to overview if valid
          localStorage.getItem('usertoken') ? <Overview/> : <Navigate to="/" />
        ),
      },
      {
        path: "/alltransactions",
        element: <ProtectedRoutes role='admin' component={AllTransactions} />,
      },
      {
        path: "/manaage",
        element: <ProtectedRoutes role='admin' component={ManageAccounts} />,
      },
  



    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

