import HomePage from "./Components/HomePage"
import Dashboard from "./DashPageComp/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./SignUp/Signup"
import Login from "./SignUp/Login"
import Calendar from "./Calendar/Calendar"

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
      element: <><Calendar></Calendar></>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
