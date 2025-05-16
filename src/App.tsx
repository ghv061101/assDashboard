import Home from "./pages/home/Home";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Users from "./pages/users/Users";
import './app.scss'
import Products from "./pages/products/Products";
import Ships from "./pages/ships/Ships";
import Job from "./pages/Jobs/Job";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import './styles/global.scss'


function App () {
  const Layout=()=>{
    return (
      <div className='main'>
        <Navbar/>
        <div className="container">
          <div className="menuContainer">
            <Menu/>
          </div>
          <div className="contentContainer">
            <Outlet/>
           </div> 
        </div>
        <Footer/>
      </div>

    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/users",
          element: <Users/>
        },
        {
          path: "/products",
          element: <Products/>
        },
        {
          path: "/ships",
          element: <Ships/>
        },
        {
          path: "/jobs",
          element: <Job/>
        }
        ]
    },
    {
      path: "/login",
      element: <div>Login</div>
    }

  ]);
    

  return (
    <RouterProvider router={router} />
  )
}

export default App