import Dashboard from "./Pages/sideNavbar/Dashboard"
import Support from "./Pages/sideNavbar/Support"
import Reservation from "./Pages/sideNavbar/Reservation"
import User_profile from "./Pages/sideNavbar/User_profile"
import Change_password from "./Pages/sideNavbar/Change_password"
import Create_excel from "./Pages/sideNavbar/Create_excel"
import Delyrefunds from "./Pages/sideNavbar/Delyrefunds"
import Logout from "./Pages/sideNavbar/Logout"
import Notif from "./Pages/sideNavbar/Notif"
//order parts
import All from "./OrderPages/All"
import Cencelled from "./OrderPages/Cencelled"
import Commissioned from "./OrderPages/Commissioned"
import Completed from "./OrderPages/Completed"
import On_hold from "./OrderPages/On_hold"
import Ordered from "./OrderPages/Ordered"
import Refunded_pended from "./OrderPages/Refunded_pended"
import Refunded from "./OrderPages/Refunded"
import Review_deleted from "./OrderPages/Review_deleted"
import Review_submitted_Pendding_refund from "./OrderPages/Review_submitted_Pendding_refund"
import Reviewed from "./OrderPages/Reviewed"
//products parts
import Add_new from "./ProductsPages/Add_new"
import All_products from "./ProductsPages/All_products"
import Disabled from "./ProductsPages/Disabled"
import Electronics from "./ProductsPages/Electronics"
import Enabled from "./ProductsPages/Enabled"
import Expensive_products from "./ProductsPages/Expensive_products"
import Fashion from "./ProductsPages/Fashion"
import Gaming_devices from "./ProductsPages/Gaming_devices"
import General from "./ProductsPages/General"
import Health_beauty from "./ProductsPages/Health_beauty"
import Home_kitchen from "./ProductsPages/Home_kitchen"
import Mobile_accessories from "./ProductsPages/Mobile_accessories"
import Pet_related from "./ProductsPages/Pet_related"
import Baby_products from "./ProductsPages/Baby_products"
//{/*premium parts*/ }
import P_enabled from "./Premium_product/P_enabled"
import P_disabled from "./Premium_product/P_disabled"
//{/*Web Layout*/ }

import Order from "./Pages/sideNavbar/Order"
import Product from "./Pages/sideNavbar/Product"
import Premium from "./Pages/sideNavbar/Premium"


import Layout from "./weblayout/Layout"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Alls from "./SupportsPages/Alls"
import Pending_reply from "./SupportsPages/Pending_reply"
import Details from "./products_details/Details"
import Order_Create from "./OrderPages/Order_Create"
import Show from "./ReservationsPages/Show"
import AddNew from "./ReservationsPages/AddNew"
import Login from "./components/Login"
import Order_Details from "./OrderPages/Order_Details"
import Product_Details from "./ProductsPages/Product_Details"
import DirectReportPage from "./SupportsPages/DirectReportPage"
import ControlData from "./ContextAPI/ControlData"

function App() {

  return (
    <>
      <div>
        <div>
          {/*dashboard Pages*/}
          <BrowserRouter>
            <ControlData>
              <Routes>
                {/*login page*/}
                <Route path="/" element={<Login />} ></Route>
                {/*layout Page*/}
                <Route path="/dashboard" element={<Layout />}>
                  {/*dashboard */}
                  <Route index element={<Dashboard />}></Route>
                  {/*support Pages*/}
                  <Route path="support" element={<Support />}>
                    <Route path="alls" element={<Alls />}></Route>
                    <Route path="pending_reply" element={<Pending_reply />}></Route>
                    <Route path="directreportpage/:id" element={<DirectReportPage />}></Route>
                  </Route>

                  {/*product_details*/}
                  <Route path="details" element={<Details />}></Route>
                  {/* Notifications page*/}
                  <Route path="notif" element={<Notif />}></Route>
                  {/*reservation pages */}
                  <Route path="reservation" element={<Reservation />}>
                    <Route path="show/" element={<Show />}></Route>
                    <Route path="addNew" element={<AddNew />}></Route>
                  </Route>



                  <Route path="user_profile" element={<User_profile />}> </Route>


                  <Route path="change_password" element={<Change_password />}> </Route>
                  <Route path="delyrefunds" element={<Delyrefunds />}> </Route>
                  <Route path="Logout" element={<Logout />}> </Route>
                  <Route path="create_excel" element={<Create_excel />}> </Route>
                  {/*product parts */}
                  <Route path="product" element={<Product />}>
                    <Route path="product_details/:id" element={<Product_Details />}></Route>
                    <Route path="all_products" element={<All_products />}></Route>
                    <Route path="add_new" element={<Add_new />}></Route>
                    <Route path="Baby_products" element={<Baby_products />}></Route>
                    <Route path="disabled" element={<Disabled />}></Route>
                    <Route path="electronics" element={<Electronics />}></Route>
                    <Route path="enabled" element={<Enabled />}></Route>
                    <Route path="expensive_products" element={<Expensive_products />}></Route>
                    <Route path="fashion" element={<Fashion />}></Route>
                    <Route path="gaming_devices" element={<Gaming_devices />}></Route>
                    <Route path="general" element={<General />}></Route>
                    <Route path="health_beauty" element={<Health_beauty />}></Route>
                    <Route path="home_kitchen" element={<Home_kitchen />}></Route>
                    <Route path="mobile_accessories" element={<Mobile_accessories />}></Route>
                    <Route path="pet_related" element={<Pet_related />}></Route>
                  </Route>
                  {/*premium parts*/}
                  <Route path="premium" element={<Premium />}>
                    <Route path="p_enabled" element={<P_enabled />}> </Route>
                    <Route path="P_disabled" element={<P_disabled />}> </Route>
                  </Route>
                  {/*order parts*/}
                  <Route path="order" element={<Order />}>
                    {/*Order Create Page*/}
                    <Route path="order_Create/:id" element={<Order_Create />}></Route>
                    <Route path="order_details/:id" element={<Order_Details />}></Route>
                    <Route path="all" element={<All />}> </Route>
                    <Route path="cencelled" element={<Cencelled />}> </Route>
                    <Route path="commissioned" element={<Commissioned />}> </Route>
                    <Route path="completed" element={<Completed />}> </Route>
                    <Route path="on_hold" element={<On_hold />}> </Route>
                    <Route path="ordered" element={<Ordered />}> </Route>
                    <Route path="Refunded_pended" element={<Refunded_pended />}> </Route>
                    <Route path="refunded" element={<Refunded />}> </Route>
                    <Route path="review_deleted" element={<Review_deleted />}> </Route>
                    <Route path="reviewed" element={<Reviewed />}> </Route>
                    <Route path="review_submitted_Pendding_refund" element={<Review_submitted_Pendding_refund />}> </Route>
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace/>}></Route>
            </Route>

          </Routes>
        </ControlData>
      </BrowserRouter>
    </div >
      </div >
    </>
  )
}

export default App