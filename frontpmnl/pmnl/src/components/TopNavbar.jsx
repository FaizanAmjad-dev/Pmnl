import { useEffect, useState } from "react";
import React from "react";
import { data, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMailSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5"; // Purana logout icon jo aapne use kiya tha
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AllData } from "../ContextAPI/UserContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuMinimize } from "react-icons/lu";


function TopNavbar() {
    const { sideClose, setSideClose, globalissue, setGlobalissue, globaluserpic, setGlobaluserpic, globalusername, setGlobalusername, globalnot, setGlobalnot } = useContext(AllData)
    const token = localStorage.getItem('access-token')
    const [round, setRound] = useState(false)
    const userType = localStorage.getItem("user_type")?.toLowerCase();
    const isSuperUser = userType === "superuser";

    const navigate = useNavigate()
    const _Out = () => {
        localStorage.removeItem("admin")
        localStorage.removeItem("UserName")
        localStorage.removeItem("User_pic")
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        localStorage.removeItem('_Id')
        setGlobalusername("")
        setGlobaluserpic("")
        navigate('/')
    }

    // ya image show karny ka leya hai
    const api = 'http://127.0.0.1:8000/parentapi/creat_user/'
    const [recieverdata, setRecieverdata] = useState({})
    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (!token) return;
        fetch(api, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        })
            .then((res) => res.json())
            .then((data) => {

                const profile = Array.isArray(data) ? data[0] : data;
                if (!profile) return;
                const baseUrl = "http://127.0.0.1:8000";
                let image = profile.User_pic;
                if (image && !image.startsWith("http")) {
                    image = image.startsWith("/")
                        ? `${baseUrl}${image}`
                        : `${baseUrl}/${image}`;
                }

                setRecieverdata({
                    ...profile,
                    User_pic: image
                });

            })
            .catch((err) => console.log(err));

    }, [token]);

    const MainImage = globaluserpic ? globaluserpic : (recieverdata.User_pic || null)

    // ya support ka part hia
    const SupportAPI = 'http://127.0.0.1:8000/parentapi/support/'
    const [reciever, setReciever] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (!token) return;
        fetch(SupportAPI, {
            headers: ({
                Authorization: `Bearer ${localStorage.getItem("access-token")}`
            })
        })
            .then((res) => res.json())
            .then((data) =>
                setGlobalissue(data.length)
            )
    }, [token])

    const API = "http://127.0.0.1:8000/parentapi/notificatoin/"
    useEffect(() => {
        const getNotifications = () => {
            const token = localStorage.getItem("access-token");
            if (!token) return;
            fetch(API, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access-token")}`
                }
            })
                .then((res) => res.json())
                .then((data) => setGlobalnot(data.length));
        };

        getNotifications();
        const interval = setInterval(getNotifications, 5000);
        return () => clearInterval(interval);
    }, [token]);



    return (
        <div className="bg-gray-100 h-14 md:h-16 shadow-xl border-b border-gray-300 fixed top-0 left-0 right-0 z-40">

            <div className="flex md:justify-end justify-between items-center h-full">
                <div className="flex items-center h-full">

                    {/* Bell */}
                    <nav className="h-full border-l border-gray-100 ">
                        <NavLink to="notif" className="flex relative items-center justify-center border-l border-gray-300 px-2 sm:px-3 md:px-5 h-full cursor-pointer hover:bg-gray-50">
                            <div>
                                <FaRegBell className="size-4 sm:size-5 text-gray-500" />
                            </div>
                            {globalnot > 0 && (
                                <span className="rounded-full bg-red-500 absolute w-4 h-4 sm:w-5 sm:h-5 text-[10px] sm:text-xs text-center flex items-center justify-center top-4 right-1 sm:right-2">
                                    {globalnot > 9 ? '9+' : globalnot}
                                </span>
                            )}
                        </NavLink>
                    </nav>

                    {/* Mail */}
                    <NavLink
                        to="support/alls"
                        className="h-full border-l border-gray-100 ">
                        <div className="flex items-center justify-center relative border-l border-gray-300 px-2 sm:px-3 md:px-5 h-full cursor-pointer hover:bg-gray-50">
                            <IoMailSharp className="size-4 sm:size-5 text-gray-500" />
                            {globalissue > 0 && (
                                <span className="rounded-full bg-red-500 absolute w-4 h-4 sm:w-5 sm:h-5 text-[10px] sm:text-xs text-center flex items-center justify-center top-4 right-1 sm:right-2">
                                    {globalissue > 9 ? '9+' : globalissue}
                                </span>
                            )}
                        </div>
                    </NavLink>

                    {/* Profile */}
                    <div
                        className="flex items-center border-l border-r border-gray-300 px-2 sm:px-3 md:px-6 h-full cursor-pointer hover:bg-gray-50 transition-all"
                        onClick={() => {
                            if (!isSuperUser) {
                                setRound(!round);
                            }
                        }}>
                        {MainImage ? (
                            <img
                                src={MainImage}
                                alt="User Profile"
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-300 mr-2"
                            />
                        ) : (
                            <CgProfile className="size-5 sm:size-6 mr-2 text-gray-500" />
                        )}
                        <h1 className="text-sm font-bold hidden md:block text-gray-700">
                            {globalusername}
                        </h1>
                        <FaCaretDown className={`ml-2 size-3 sm:size-4 text-gray-500 transition-transform ${round ? "rotate-180" : ""}`} />
                    </div>

                </div>

                <button onClick={() => setSideClose(!sideClose)}>
                    <div className="h-full sm:block md:hidden flex items-center justify-center relative px-3 sm:px-5 cursor-pointer">
                        {sideClose ? <LuMinimize className="size-5 text-gray-500" /> : <RxHamburgerMenu className="size-5 text-gray-500" />}
                    </div>
                </button>
            </div>

            {
                round && (
                    <div className="absolute right-0 top-14 md:top-16 w-44 sm:w-48 md:w-52 bg-white shadow-2xl border border-gray-200 rounded z-50 transition-transform ease-in duration-800">
                        <div className="p-1">
                            <NavLink to="/dashboard/User_profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                                {MainImage ?
                                    <img src={MainImage} alt="" className="rounded-full w-7 h-7 sm:w-8 sm:h-8 mr-3" />
                                    :
                                    <CgProfile className="size-5 sm:size-6 mr-3 text-gray-500" />
                                }
                                Profile
                            </NavLink>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={_Out} className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-100 font-medium">
                                <IoSearchOutline className="mr-3 size-4 sm:size-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TopNavbar;