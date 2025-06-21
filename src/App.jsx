import HomePage from "./Components/HomePage"
import Dashboard from "./DashPageComp/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./SignUp/Signup"
import Login from "./SignUp/Login"
import CalPlusNav from "./Calendar/CalPlusNav"
import TaskNav from "./Tasks/TaskNav"
import InsightNav from './Insights/InsightNav'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <HomePage></HomePage>
      </>
    },
    {
      path: "/dashboard",
      element: <>
        <Dashboard></Dashboard>
      </>
    },
    {
      path: "/signup",
      element: <>
        <Signup></Signup>
      </>
    },
    {
      path: "/login",
      element: <><Login></Login></>
    },
    {
      path: '/calendar',
      element: <>
      <CalPlusNav></CalPlusNav>
      </>
    },
    {
      path: '/tasks',
      element: <><TaskNav></TaskNav></>
    },
    {
      path: '/insights',
      element: <><InsightNav></InsightNav></>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
