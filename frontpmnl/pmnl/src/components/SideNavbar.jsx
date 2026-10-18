import { NavLink } from "react-router-dom"

import { IoLogoXing } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { HiDocumentPlus } from "react-icons/hi2";
import { RiLayoutVerticalLine } from "react-icons/ri";
import { MdLock } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaFileExcel } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { PiMinusSquareDuotone } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
{/*order list icons*/ }
import { FaEye } from "react-icons/fa";
import { HiThumbUp } from "react-icons/hi";
import { AiFillCloseSquare } from "react-icons/ai";
import { BsDashSquareFill } from "react-icons/bs";
import { IoHandLeftSharp } from "react-icons/io5";
import { PiClockCountdown } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { FaArrowAltCircleDown } from "react-icons/fa";
{/*products list icons*/ }
import { FaPlusSquare } from "react-icons/fa";
import { MdStoreMallDirectory } from "react-icons/md";
import { FcCableRelease } from "react-icons/fc";
import { RiMentalHealthLine } from "react-icons/ri";
import { PiBabyBold } from "react-icons/pi";
import { SiYoutubegaming } from "react-icons/si";
import { GiClothes } from "react-icons/gi";
import { FcSmartphoneTablet } from "react-icons/fc";
import { MdOutlinePets } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import logo from "../assets/Img/logo_pmnl.jpeg"

import { IoIosTimer } from "react-icons/io";
import { useContext } from "react";
import { AllData } from "../ContextAPI/UserContext";

// logout
import React, { useState } from 'react'; // Add this line
import { useNavigate } from "react-router-dom";
function SideNavbar() {
    const { sideClose, setSideClose, globalusername, setGlobalusername, globaluserpic, setGlobaluserpic } = useContext(AllData)
    const userType = localStorage.getItem("user_type")?.toLowerCase();
    const isSuperUser = userType === "superuser";
    const isAdmin = userType === "admin";
    const isClient = userType === "client";
    const isAdminOrSuper = isAdmin || isSuperUser;

    // logout
    const navigate = useNavigate()
    const _Out = () => {
        localStorage.clear()
        setGlobaluserpic("")
        setGlobalusername("")
        navigate('/')
    }

    const active = ({ isActive }) =>
        isActive
            ? "border-l-5 border-t border-t-gray-300 border-b border-b-gray-300 text-green-600 hover:border-l-5 hover:border-l-green-600 hover:text-green-600 py-2 sm:py-3 md:py-4 px-3 sm:px-4 hover:bg-gray-100/50 text-sm"
            : "border-t border-b border-gray-300 hover:border-l-5 hover:border-l-green-600 hover:text-green-600 hover:outline-none hover:bg-gray-100/50 border-l-5 border-l-white text-gray-500 py-2 sm:py-3 md:py-4 px-3 sm:px-4 text-sm";

    const order = ({ isActive }) =>
        isActive
            ? "py-2 sm:py-3 md:py-4 pl-4 sm:pl-6 border-t border-t-gray-200 border-b border-b-gray-200 hover:text-green-600 text-gray-400 ml-6 sm:ml-10 border-l-5 border-l-green-600 text-xs"
            : "py-2 sm:py-3 md:py-4 pl-4 sm:pl-6 text-gray-400 ml-6 sm:ml-10 border-b border-b-gray-200 border-t border-t-gray-200 hover:border-l-5 hover:border-l-green-600 hover:text-green-600 hover:outline-none hover:white border-l-5 border-l-white text-xs";

    const orders = "inline pr-2 mr-2 size-5 sm:size-6 group-hover:text-green-600";
    const product = "inline pr-2 mr-2 size-5 sm:size-6 group-hover:text-green-600";
    const Premium = "inline pr-2 mr-2 size-5 sm:size-6 group-hover:text-green-600";
    const support = "inline pr-2 mr-2 size-5 sm:size-6 group-hover:text-green-600";
    const reservations = "inline pr-2 mr-2 size-5 sm:size-6 group-hover:text-green-600";
    const logout = "inline pr-2 mr-2 size-5 sm:size-6 group-hover:text-green-600";


    const [orderpopup, setOrderpopup] = useState(false)
    const [productpopup, setProductpopup] = useState(false)
    const [premiumpop, setPremiumpop] = useState(false)
    const [supportpop, setSupportpop] = useState(false)
    const [reservationpop, setReservationpop] = useState(false)

    return (
        <>
            {sideClose && (
                <div onClick={() => setSideClose(false)} className="fixed inset-0 bg-white/30 backdrop-blur-sm z-[50] md:hidden">
                </div>
            )}

            <div
                className={`transition-transform duration-400 sm:ease-in md:ease-out bg-white fixed left-0 top-0 h-screen overflow-y-auto z-50 ${sideClose ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="shadow-2xl w-64 sm:w-72 md:w-60 lg:w-80">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center justify-center border-b border-gray-300 py-3 sm:py-4 px-4 sm:px-6">
                            <img src={logo} alt="" className="w-8 h-8 object-cover rounded" />
                            <h1 className="ml-4 text-base sm:text-lg font-bold text-gray-700">Dashboard</h1>
                        </div>

                        <nav className="flex flex-col">
                            <NavLink to="/dashboard" onClick={() => setSideClose(false)} className={active}>
                                <BiSolidDashboard className="inline pr-2 size-5 sm:size-6" />Dashboard
                            </NavLink>

                            <div className="group">
                                <div onClick={() => setOrderpopup(!orderpopup)} className={`border-b border-t border-gray-300 flex flex-row items-center justify-between border-l-5 transition-all cursor-pointer ${orderpopup
                                        ? "text-green-600 border-l-green-600 py-2 sm:py-3 px-3 sm:px-4 bg-gray-50"
                                        : "hover:border-l-5 hover:border-l-green-600 hover:text-green-600 border-l-5 border-l-white text-gray-500 py-2 sm:py-3 px-3 sm:px-4"
                                    }`}>
                                    <div className="flex items-center">
                                        <GiShoppingBag className="inline pr-2 size-5 sm:size-6" /> Order
                                    </div>
                                    <FaArrowAltCircleDown className={`mr-2 transition-transform duration-300 ${orderpopup ? "rotate-180 text-green-600" : "rotate-0 text-gray-400"
                                        }`} />
                                </div>

                                {orderpopup && (
                                    <div className="flex flex-col bg-gray-50/50">
                                        <NavLink onClick={() => setSideClose(false)} to="order/All" className={order}><FaEye className={orders} /> All</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Ordered" className={order}><FaEye className={orders} />Ordered</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Reviewed" className={order}><FaEye className={orders} />Reviewed</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Review_submitted_Pendding_refund" className={order}><HiThumbUp className={orders} />Reciewed Submitted Pending Refunded</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Review_deleted" className={order}><AiFillCloseSquare className={orders} />Review Deleted</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Refunded" className={order}><BsDashSquareFill className={orders} />Refunded</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/On_hold" className={order}><IoHandLeftSharp className={orders} />On Hold</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Refunded_pended" className={order}><PiClockCountdown className={orders} />Refunded Pending </NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Cencelled" className={order}><AiFillCloseSquare className={orders} />Cencelled</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Commissioned" className={order}><AiFillCloseSquare className={orders} />Commissioned</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="order/Completed" className={order}><SiTicktick className={orders} />Completed </NavLink>
                                    </div>
                                )}
                            </div>

                            <div className="group">
                                <div onClick={() => setProductpopup(!productpopup)} className={`border-b border-gray-300 flex flex-row items-center justify-between border-l-5 transition-all cursor-pointer ${productpopup
                                        ? "text-green-600 border-l-green-600 py-2 sm:py-3 px-3 sm:px-4 bg-gray-50"
                                        : "hover:border-l-5 hover:border-l-green-600 hover:text-green-600 border-l-5 border-l-white text-gray-500 py-2 sm:py-3 px-3 sm:px-4"
                                    }`}>
                                    <div className="flex items-center">
                                        <HiDocumentPlus className="inline pr-2 size-5 sm:size-6" />Product
                                    </div>
                                    <FaArrowAltCircleDown className={`mr-2 transition-transform duration-300 ${productpopup ? "rotate-180 text-green-600" : "rotate-0 text-gray-400"
                                        }`} />
                                </div>

                                {productpopup && (
                                    <div className="flex flex-col bg-gray-50/50">
                                        {isAdmin && (
                                            <>
                                                <NavLink onClick={() => setSideClose(false)} to="product/Add_new" className={order}><FaPlusSquare className={product} /> Add New</NavLink>
                                                <NavLink onClick={() => setSideClose(false)} to="product/Enabled" className={order}><FaEye className={product} /> Enabled</NavLink>
                                                <NavLink onClick={() => setSideClose(false)} to="product/Disabled" className={order}><FaEye className={product} /> Disabled</NavLink>
                                            </>
                                        )}
                                        <NavLink onClick={() => setSideClose(false)} to="product/All_products" className={order}><MdStoreMallDirectory className={product} /> All Products</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/General" className={order}><MdStoreMallDirectory className={product} /> General</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Electronics" className={order}><FcCableRelease className={product} /> Electronics</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Health_beauty" className={order}><RiMentalHealthLine className={product} />Health & Beauty</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Baby_products" className={order}><PiBabyBold className={product} /> Baby Products</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Gaming_devices" className={order}><SiYoutubegaming className={product} /> Gaming Products</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Fashion" className={order}><GiClothes className={product} /> Fashion </NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Mobile_accessories" className={order}><FcSmartphoneTablet className={product} /> Moblie Acessories</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Expensive_products" className={order}><MdStoreMallDirectory className={product} /> Expensive Products</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Pet_related" className={order}><MdOutlinePets className={product} />Pet Relate</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="product/Home_kitchen" className={order}><FaHome className={product} /> Home & KItchen</NavLink>
                                    </div>
                                )}
                            </div>

                            {/* Premium Products – only for admin */}
                            {isAdmin && (
                                <div className="group">
                                    <div onClick={() => setPremiumpop(!premiumpop)} className={`border-b border-gray-300 flex flex-row items-center justify-between border-l-5 transition-all cursor-pointer ${premiumpop
                                            ? "text-green-600 border-l-green-600 py-2 sm:py-3 px-3 sm:px-4 bg-gray-50"
                                            : "hover:border-l-5 hover:border-l-green-600 hover:text-green-600 border-l-5 border-l-white text-gray-500 py-2 sm:py-3 px-3 sm:px-4"
                                        }`}>
                                        <div className="flex items-center">
                                            <HiDocumentPlus className="inline pr-2 size-5 sm:size-6" />Premium Product
                                        </div>
                                        <FaArrowAltCircleDown className={`mr-2 transition-transform duration-300 ${premiumpop ? "rotate-180 text-green-600" : "rotate-0 text-gray-400"
                                            }`} />
                                    </div>

                                    {premiumpop && (
                                        <div className="flex flex-col bg-gray-50/50">
                                            <NavLink onClick={() => setSideClose(false)} to="product/Enabled" className={order}><FaEye className={Premium} />Enabled</NavLink>
                                            <NavLink onClick={() => setSideClose(false)} to="product/Disabled" className={order}><FaEye className={Premium} />Disabled</NavLink>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Reservation */}
                            {!isClient ? (
                                <NavLink onClick={() => setSideClose(false)} to="Reservation/Show">
                                    <div onClick={() => setReservationpop(!reservationpop)} className={`border-b border-gray-300 flex flex-row items-center justify-between border-l-5 transition-all cursor-pointer ${reservationpop
                                            ? "text-green-600 border-l-green-600 py-2 sm:py-3 px-3 sm:px-4 bg-gray-50"
                                            : "hover:border-l-5 hover:border-l-green-600 hover:text-green-600 border-l-5 border-l-white text-gray-500 py-2 sm:py-3 px-3 sm:px-4"
                                        }`}>
                                        <div className="flex items-center">
                                            <RiLayoutVerticalLine className="inline pr-2 size-5 sm:size-6" />Reservation
                                        </div>
                                    </div>
                                </NavLink>
                            ) : (
                                <div className="group">
                                    <div onClick={() => setReservationpop(!reservationpop)} className={`border-b border-gray-300 flex flex-row items-center justify-between border-l-5 transition-all cursor-pointer ${reservationpop
                                            ? "text-green-600 border-l-green-600 py-2 sm:py-3 px-3 sm:px-4 bg-gray-50"
                                            : "hover:border-l-5 hover:border-l-green-600 hover:text-green-600 border-l-5 border-l-white text-gray-500 py-2 sm:py-3 px-3 sm:px-4"
                                        }`}>
                                        <div className="flex items-center">
                                            <RiLayoutVerticalLine className="inline pr-2 size-5 sm:size-6" />Reservation
                                        </div>
                                        <FaArrowAltCircleDown className={`mr-2 transition-transform duration-300 ${reservationpop ? "rotate-180 text-green-600" : "rotate-0 text-gray-400"
                                            }`} />
                                    </div>
                                    {reservationpop && (
                                        <div className="flex flex-col bg-gray-50/50">
                                            <NavLink onClick={() => setSideClose(false)} to="Reservation/addNew" className={order}><FaPlusSquare className={reservations} /> Add New</NavLink>
                                            <NavLink onClick={() => setSideClose(false)} to="Reservation/Show" className={order}><FaEye className={reservations} /> Show</NavLink>
                                        </div>
                                    )}
                                </div>
                            )}

                            {userType === "client" && (
                                <>
                                    <NavLink onClick={() => setSideClose(false)} to="Change_password" className={active}><MdLock className="inline pr-2 size-5 sm:size-6" />Change Password</NavLink>
                                    <NavLink onClick={() => setSideClose(false)} to="User_profile" className={active}><IoPersonSharp className="inline pr-2 size-5 sm:size-6" />User Profile</NavLink>
                                </>
                            )}
                            {userType === "admin" && (
                                <>
                                    <NavLink onClick={() => setSideClose(false)} to="Change_password" className={active}><MdLock className="inline pr-2 size-5 sm:size-6" />Change Password</NavLink>
                                    <NavLink onClick={() => setSideClose(false)} to="User_profile" className={active}><IoPersonSharp className="inline pr-2 size-5 sm:size-6" />User Profile</NavLink>
                                </>
                            )}

                            <NavLink onClick={() => setSideClose(false)} to="Create_excel" className={active}><FaFileExcel className="inline pr-2 size-5 sm:size-6" />Create Excel</NavLink>

                            {/* Support */}
                            <div className="group">
                                <div onClick={() => setSupportpop(!supportpop)} className={`border-b border-t border-gray-300 flex flex-row items-center justify-between border-l-5 transition-all cursor-pointer ${supportpop
                                        ? "text-green-600 border-l-green-600 py-2 sm:py-3 px-3 sm:px-4 bg-gray-50"
                                        : "hover:border-l-5 hover:border-l-green-600 hover:text-green-600 border-l-5 border-l-white text-gray-500 py-2 sm:py-3 px-3 sm:px-4"
                                    }`}>
                                    <div className="flex items-center">
                                        <IoMdMail className="inline pr-2 size-5 sm:size-6" />Support
                                    </div>
                                    <FaArrowAltCircleDown className={`mr-2 transition-transform duration-300 ${supportpop ? "rotate-180 text-green-600" : "rotate-0 text-gray-400"
                                        }`} />
                                </div>
                                {supportpop && (
                                    <div className="flex flex-col bg-gray-50/50">
                                        <NavLink onClick={() => setSideClose(false)} to="support/pending_reply" className={order}><IoIosTimer className={support} />Pending Reply</NavLink>
                                        <NavLink onClick={() => setSideClose(false)} to="support/alls" className={order}><FaEye className={support} />All</NavLink>
                                    </div>
                                )}
                            </div>

                            <NavLink onClick={() => setSideClose(false)} to="Delyrefunds" className={active}><PiMinusSquareDuotone className="inline pr-2 size-5 sm:size-6" />Delay Refund</NavLink>

                            <button to="Logout" onClick={_Out} className="border-b border-gray-300 flex flex-row items-center border-l-5 cursor-pointer text-red-600 border-l-red-600 py-2 sm:py-3 px-3 sm:px-4 bg-gray-50">
                                <LuLogOut className="inline pr-2 size-5 sm:size-6" />
                                <h1> Logout </h1>
                            </button>

                            <div className="border-t border-gray-300 py-6 px-4 mb-2"></div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SideNavbar
