import { useEffect, useState } from "react"
import user from "../../assets/Img/Profileimg.png"
import { HiOutlineRefresh } from "react-icons/hi";
import { useContext } from "react";
import { AllData } from "../../ContextAPI/UserContext";

function User_profile() {
     const { globaluserpic, setGlobaluserpic, globalusername, setGlobalusername } = useContext(AllData)
     const role = localStorage.getItem('admin')
     const token = localStorage.getItem('access-token')
     const api = 'http://127.0.0.1:8000/parentapi/creat_user/'
     const [recieverdata, setRecieverdata] = useState({})

     const [formdata, setFormdata] = useState({
          username: "",
          user_number: "",
          email: '',
          address: "",
          city: "",
          country: "",
          bank: "",
          accoutn: "",
          gender: "",
     })
     const handleFormData = (ProfileData) => {
          setRecieverdata(ProfileData)
          setFormdata({
               username: ProfileData.user_name || "",
               user_number: ProfileData.user_number,
               email: ProfileData.user_email || "",
               address: ProfileData.address,
               city: ProfileData.city,
               country: ProfileData.country,
               bank: ProfileData.bank,
               accoutn: ProfileData.accoutn,
               gender: ProfileData.gender,
          })
     }

     useEffect(() => {
          fetch(api, {
               headers: {
                    'Authorization': `Bearer ${token}`
               }
          })
               .then((res) => res.json())
               .then((data) => {
                    const ProfileData = Array.isArray(data) ? data[0] : data;
                    if (ProfileData) {
                         handleFormData(ProfileData)
                    }
               })
     }, [token])

     const Handleinput = (e) => {
          setFormdata({ ...formdata, [e.target.name]: e.target.value })
     }

     const targetAPIid = `http://127.0.0.1:8000/parentapi/creat_user/${recieverdata.id}/`;
     const HandleSubmit = (e) => {
          e.preventDefault();

          const payload = {
               username: formdata.username,
               email: formdata.email,
               user_number: formdata.user_number,
               address: formdata.address,
               city: formdata.city,
               country: formdata.country,
               bank: formdata.bank,
               accoutn: formdata.accoutn,
          }
          fetch(targetAPIid, {
               method: "PATCH",
               headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(payload)
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data)
                    if (data) {
                         localStorage.setItem('UserName', data.user_name)
                         setGlobalusername(data.user_name)
                         window.alert("Success")
                    }
                    handleFormData(data)
               })
     }

     // image update karny ka leya 
     const HandelImage = (e) => {
          const filename = e.target.name;
          const FileURL = e.target.files[0];
          if (!FileURL) return;

          let carry = new FormData();
          carry.append(filename, FileURL)
          const targetAPIid = `http://127.0.0.1:8000/parentapi/creat_user/${recieverdata.id}/`;
          fetch(targetAPIid, {
               method: "PATCH",
               headers: {
                    'Authorization': `Bearer ${token}`
               },
               body: carry
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data) {
                         localStorage.setItem('User_pic', data.User_pic)
                         setGlobaluserpic(data.User_pic)
                         window.alert("Success")
                    }
                    handleFormData(data)
               })
     }

     return (
          <div className="bg-gray-200/80 min-h-screen">
               <div className="w-full min-h-screen bg-slate-50/50 pb-12">

                    {/* Name / Heading Section */}
                    <div className="ml-8 pt-10 pb-4">
                         <span className="text-xs font-bold text-gray-400 tracking-widest block mb-1">OVERVIEW</span>
                         <h1 className="font-bold text-3xl text-gray-800 tracking-tight">
                              {globalusername}
                         </h1>
                    </div>

                    {/* Main Profile Flex Container */}
                    <div className="flex flex-col lg:flex-row items-start gap-8 px-8 py-4">

                         {/* Pic Logo Profile Section (Left Side Card) */}
                         <div className="w-full lg:flex-1 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col items-center pt-8 overflow-hidden transition-all duration-300">

                              {/* User Profile Image (Perfect Circle) */}
                              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                                   <img
                                        src={recieverdata.User_pic}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                   />
                              </div>

                              {/* Name & Role */}
                              <div className="text-center mt-5 flex flex-col gap-1 px-4">
                                   <h2 className="font-semibold text-2xl text-slate-700 tracking-tight">
                                        {globalusername}
                                   </h2>
                                   <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                                        {role ? "PM" : "Seller"}
                                   </span>
                              </div>

                              {/* Pic Button */}
                              <div className="mt-5 mb-6">
                                   <label className="flex items-center gap-2 px-5 py-2.5 border border-green-500 rounded-full text-green-600 text-sm font-medium bg-white hover:bg-green-50 cursor-pointer transition-all active:scale-95 shadow-sm">
                                        <HiOutlineRefresh className="w-4 h-4" />
                                        <span>Change Pic</span>
                                        <input
                                             type="file"
                                             accept="image/*"
                                             className="hidden"
                                             name="User_pic"
                                             onChange={HandelImage}
                                        />
                                   </label>
                              </div>

                              <hr className="w-full border-gray-100" />

                              {/*Progress Bar Section */}
                              <div className="w-full px-6 py-6 bg-gray-50/50 mt-auto">
                                   <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-500">Performance</span>
                                        <span className="text-xs font-bold text-gray-400">0%</span>
                                   </div>

                                   <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                             className="h-full bg-green-500 rounded-full transition-all duration-500">
                                        </div>
                                   </div>
                              </div>

                         </div>


                         {/* Form Section*/}
                         <div className="w-full lg:flex-[2] bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                              <form onSubmit={HandleSubmit} className="pb-8">

                                   {/* Title */}
                                   <div className="pl-6 pt-6 pb-4">
                                        <h1 className="font-bold text-xl text-slate-800 tracking-tight">Account Details</h1>
                                   </div>

                                   <hr className="border-gray-100 mb-6" />

                                   {/* Main Form Fields Grid */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 px-6 mb-6">

                                        {/* Name */}
                                        <div className="flex flex-col gap-1.5">
                                             <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
                                             <input
                                                  onChange={Handleinput}
                                                  value={formdata.username}
                                                  name="username"
                                                  type="text"
                                                  id="name"
                                                  placeholder="User Name"
                                                  className="border border-gray-300 p-2.5 rounded-lg text-gray-800 outline-none focus:border-green-500 transition-all text-sm"
                                             />
                                        </div>

                                        {/* Username */}
                                        <div className="flex flex-col gap-1.5">
                                             <label htmlFor="username" className="text-sm font-medium text-gray-600">Username</label>
                                             <input
                                                  onChange={Handleinput}
                                                  value={formdata.username}
                                                  name="username"
                                                  type="text"
                                                  id="username"
                                                  placeholder="User name"
                                                  className="border border-gray-200 p-2.5 rounded-lg text-gray-400 bg-gray-50 outline-none cursor-not-allowed text-sm"
                                                  readOnly
                                             />
                                        </div>

                                        {/* Email */}
                                        <div className="flex flex-col gap-1.5">
                                             <label htmlFor="eml" className="text-sm font-medium text-gray-600">Email</label>
                                             <input
                                                  onChange={Handleinput}
                                                  value={formdata.email}
                                                  name="email"
                                                  type="email"
                                                  id="eml"
                                                  placeholder="Email .. "
                                                  className="border border-gray-200 p-2.5 rounded-lg text-gray-400 bg-gray-50 outline-none cursor-not-allowed text-sm"
                                                  readOnly
                                             />
                                        </div>

                                        {/* Gender */}
                                        <div className="flex flex-col gap-1.5">
                                             <label htmlFor="gender" className="text-sm font-medium text-gray-600">Gender</label>
                                             <input
                                                  onChange={Handleinput}
                                                  value={formdata.gender}
                                                  name="gender"
                                                  type="text"
                                                  id="gender"
                                                  placeholder="Gender"
                                                  className="border border-gray-200 p-2.5 rounded-lg text-gray-400 bg-gray-50 outline-none cursor-not-allowed text-sm"
                                                  readOnly
                                             />
                                        </div>

                                        {/* Address */}
                                        <div className="flex flex-col gap-1.5 md:col-span-2">
                                             <label htmlFor="address" className="text-sm font-medium text-gray-600">Address</label>
                                             <input
                                                  onChange={Handleinput}
                                                  value={formdata.address}
                                                  name="address"
                                                  type="text"
                                                  id="address"
                                                  placeholder="Address"
                                                  className="border border-gray-300 p-2.5 rounded-lg text-gray-800 outline-none focus:border-green-500 transition-all w-full text-sm"
                                             />
                                        </div>

                                        {/* City */}
                                        <div className="flex flex-col gap-1.5">
                                             <label htmlFor="city" className="text-sm font-medium text-gray-600">City</label>
                                             <input
                                                  onChange={Handleinput}
                                                  value={formdata.city || ""}
                                                  name="city"
                                                  type="text"
                                                  id="city"
                                                  placeholder="city..."
                                                  className="border border-gray-300 p-2.5 rounded-lg text-gray-800 outline-none focus:border-green-500 transition-all text-sm"
                                             />
                                        </div>

                                        {/* Country & Phone */}
                                        <div className="grid grid-cols-2 gap-4">
                                             <div className="flex flex-col gap-1.5">
                                                  <label htmlFor="country" className="text-sm font-medium text-gray-600">Country</label>
                                                  <input
                                                       onChange={Handleinput}
                                                       value={formdata.country || ""}
                                                       name="country"
                                                       type="text"
                                                       id="country"
                                                       placeholder="Country"
                                                       className="border border-gray-300 p-2.5 rounded-lg text-gray-800 outline-none focus:border-green-500 transition-all text-sm"
                                                  />
                                             </div>
                                             <div className="flex flex-col gap-1.5">
                                                  <label htmlFor="phone" className="text-sm font-medium text-gray-600">Phone</label>
                                                  <input
                                                       onChange={Handleinput}
                                                       value={formdata.user_number || ""}
                                                       name="user_number"
                                                       type="text"
                                                       id="phone"
                                                       placeholder="Mobile Number.."
                                                       className="border border-gray-200 p-2.5 rounded-lg text-gray-500 bg-gray-50/80 outline-none text-sm"
                                                  />
                                             </div>
                                        </div>

                                        {/* Bank Name */}
                                        <div className="flex flex-col gap-1.5">
                                             <label htmlFor="bank_name" className="text-sm font-medium text-gray-600">Bank Name</label>
                                             <input
                                                  onChange={Handleinput}
                                                  value={formdata.bank || ""}
                                                  name="bank"
                                                  type="text"
                                                  id="bank_name"
                                                  placeholder="Bank"
                                                  className="border border-gray-300 p-2.5 rounded-lg text-gray-800 outline-none focus:border-green-500 transition-all text-sm"
                                             />
                                        </div>

                                        {/* Account# */}
                                        <div className="flex flex-col gap-1.5">
                                             <label htmlFor="account_no" className="text-sm font-medium text-gray-600">Account#</label>
                                             <input
                                                  onChange={Handleinput}
                                                  value={formdata.accoutn || ""}
                                                  name="accoutn"
                                                  type="text"
                                                  id="account_no"
                                                  placeholder="....000..."
                                                  className="border border-gray-300 p-2.5 rounded-lg text-gray-800 outline-none focus:border-green-500 transition-all text-sm"
                                             />
                                        </div>

                                   </div>

                                   {/* Update Button Section */}
                                   <div className="px-6 pt-2">
                                        <button
                                             type="submit"
                                             className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-sm transition-all duration-150 active:scale-95 text-sm"
                                        >
                                             Update Account
                                        </button>
                                   </div>
                              </form>
                         </div>

                    </div>
               </div>
          </div>
     )
}
export default User_profile