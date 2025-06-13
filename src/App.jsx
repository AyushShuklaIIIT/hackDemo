import Navigation from "./Components/Navigation"
import HeroSection from "./Components/HeroSection"
import Features from "./Components/Features"
import Dashboard from "./DashPageComp/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Navigation></Navigation>
        <HeroSection></HeroSection>
        <Features></Features>
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
        <Navigation></Navigation>
        <div>This is signup page</div>
      </>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
