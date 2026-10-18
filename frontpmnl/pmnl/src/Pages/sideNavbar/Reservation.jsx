import dev from "../../assets/Img/profileimg.png"
import { RxCross2 } from "react-icons/rx";
import { Outlet } from "react-router-dom";
function Reservation() {
    return (
         <div>
            <Outlet/>
         </div>
    )
}
export default Reservation




// <div className="bg-gray-200/80 p-2 min-h-screen px-8">
//     {/*title*/}
//     <div className="w-full h-auto pt-7">
//         <h1 className="font-semibold text-3xl text-gray-700"> Change Password</h1>
//     </div>
//     {/*parent dev*/}
//     <div className="flex flex-row h-75 mt-15 py-4 px-4 w-full border-2 border-gray-300 bg-white/80 rounded-b ">
//         {/*main  parent dev*/}
//         <div className="w-full border border-gray-200 shadow-xl rounded-xl bg-white h-60">
//             {/*title dev*/}
//             <div className="w-full px-6 py-6">
//                 <h1 className="text-gray-700 text-xl font-semibold">Active Reservations </h1>
//             </div>
//             <hr className="w-full text-gray-300 " />

//             {/*main part title*/}
//             <div className=" bg-gray-100 flex flex-row justify-around text-center py-5">
//                 <div>
//                     <h1 className="font-bold text-gray-700 w-40">#</h1>
//                 </div>
//                 <div>
//                     <h1 className="font-bold text-gray-700 w-40"> User</h1>
//                 </div>
//                 <div>
//                     <h1 className="font-bold text-gray-700 w-40 ">Product ID</h1>
//                 </div>
//                 <div className="font-bold text-gray-700 w-40 ">
//                     <h1>Remaining Time</h1>
//                 </div>
//                 <div className="font-bold text-gray-700 w-40">
//                     <h1>Image</h1>
//                 </div>
//                 {/*these are empty dev for flex-around */}
//                 <div className="w-40"></div>
//                 <div className="w-40"></div>
//             </div>
//             <hr className="w-full text-gray-300 " />

//             {/*time detail create on relase div*/}
//             <div className="flex flex-row justify-around text-center pt-5">
//                 <div className="w-40 text-green-600">
//                     <p>17498238</p>
//                 </div>
//                 <div className="w-40 text-green-600">
//                     <p>Tauseef Khan </p>
//                 </div>
//                 <div className="w-40 ">
//                     <p>32797087</p>
//                 </div>
//                 <div className="w-40 text-red-600 ">
//                     <p>1:19:50</p>
//                 </div>
//                 <div className="w-40  ">
//                     <img src={dev} alt="" className="rounded-full overflow-hidden w-10 h-10 border ml-6 " />
//                 </div>
//                 {/*empty div*/}
//                 <div className="w-80 flex flex-row justify-evenly px-4 ">
//                     <button type="submit" className="cursor-pointer py-2 px-4 bg-green-700/90 hover:bg-green-600 text-white rounded">Create Order</button>
//                     <button type="submit" className="cursor-pointer py-2 px-4 bg-red-700/90 hover:bg-red-600 text-white rounded"><RxCross2 className="inline mr-2" /> Releases</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>