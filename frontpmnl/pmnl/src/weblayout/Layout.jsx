import SideNavbar from "../components/SideNavbar";
import TopNavbar from "../components/TopNavbar";
import { Outlet, Navigate } from "react-router-dom";
import Add_page from "../AddPages/Add_page";
import { jwtDecode } from "jwt-decode";

function Layout() {
  const token = localStorage.getItem('access-token')
  if (!token) {
    return <Navigate to="/" replace />
  }
  try {
    const decodetoken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    if (decodetoken.exp < currentTime) {
      localStorage.removeItem('access-token')
      return <Navigate to="/" replace />
    }
  } catch (error) {
    console.log('backend sy token nahi a raha hai ')
    localStorage.removeItem('access-token')
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex w-full">
      <SideNavbar />

      <div className="flex-1 ml-0 md:ml-60 lg:ml-80">
        <TopNavbar />

        <div className="flex flex-1 w-full">
          <div className="w-full pt-14 md:pt-16">
            <Outlet />
          </div>
          {/* 
          <div className="w-79 h-auto">
            <Add_page />
          </div> 
          */}
        </div>
      </div>
    </div>
  )
}

export default Layout;