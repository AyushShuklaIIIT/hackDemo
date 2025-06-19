import HomePage from "./Components/HomePage"
import Dashboard from "./DashPageComp/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./SignUp/Signup"
import Login from "./SignUp/Login"
import CalPlusNav from "./Calendar/CalPlusNav"
import TaskNav from "./Tasks/TaskNav"
import Insights from "./Insights/Insights"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        {/* <HomePage></HomePage> */}
        {/* <Tasks></Tasks> */}
        <Insights></Insights>
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
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
