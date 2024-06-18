import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import './App.css';
import Home from './screens/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Main from './screens/Main';
import MyOrders from './screens/MyOrders';

function App() {
  const routerObj = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      children: [{
        path: '/',
        element: <Main/>
      },
      {
        path: '/createuser',
        element:<SignUp/>
      },
      {
        path: '/loginuser',
        element:<Login/>
        },
        {
          path: '/myorders',
          element:<MyOrders/>
      }]
    }
  ])
  return (
    <div>
      <RouterProvider router={routerObj} ></RouterProvider>
   </div>
  );
}

export default App;
