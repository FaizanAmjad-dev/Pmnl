import { useEffect, useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import { IoCaretDownSharp } from "react-icons/io5";
//  IS LINE KO LIKHEIN
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

function Dashboard() {

    const [count, setCount] = useState({
        total_order: 0,
        total_review: 0,
        pending_review: 0,
        refunded: 0,
        ref_pen_revi: 0,
        onhold: 0,
        review_delete: 0,
        order_cen_pmm: 0,
        cencelled: 0,
        complete: 0
    })

    const token = localStorage.getItem('access-token')
    const api = 'http://127.0.0.1:8000/parentapi/dashboard/'
    useEffect(() => {
        fetch(api, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setCount(data);
            })
    }, [])

    return (
        <div className="bg-gray-200  min-h-screen h-full ">
            <div className="w-full h-auto lg:ml-8 pt-14 md:px-4">
                <div><h1 className="font-semibold text-gray-500">DASHBOARD</h1></div>
                <div><h1 className="font-bold text-3xl text-gray-700">Orders Overview</h1></div>
            </div>

            {/*main part*/}
            <div className="lg:p-5 lg:m-4 md:py-4  ">

                {/*mian gird part*/}
                <div className="space-y-8 gird grid-rows-12 ">
                    {/*first part*/}
                    <ul className="grid grid-cols-3 grid-row-6 space-x-6">
                        {/*compeleted*/}
                        <div className="flex flex-col items-center py-2 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-6">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">COMPELTED</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.complete}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-green-600 font-semibold"><FaCaretUp className=" mr-1" />0</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-49 text-xl text-gray-500 mb-2">%</code>
                            </div>
                        </div>
                        {/*cenclled*/}
                        <div className="flex flex-col items-center py-2 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-6">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">CENCELLED</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.cencelled}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-red-600 font-semibold"><IoCaretDownSharp className=" mr-1" />3.00000000</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-49 text-xl text-gray-500 mb-2">%</code>
                            </div>
                        </div>
                        {/*Refunded*/}
                        <div className="flex flex-col items-center py-2 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-6">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">REFUDED</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.refunded}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-red-600 font-semibold"><IoCaretDownSharp className=" mr-1" />73.79200000</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-49 text-xl text-gray-500 mb-2">%</code>
                            </div>
                        </div>
                    </ul>




                    {/*second part*/}
                    <ul className="grid grid-cols-4 grid-row-8 space-x-6">

                        {/*Commissioned*/}
                        <div className="flex flex-col items-center py-4 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-3">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">COMMISSIONED</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.order_cen_pmm}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-green-600 font-semibold"><FaCaretUp className=" mr-1" />0</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-28 text-xl text-gray-500 mb-2 font-semibold">0%</code>
                            </div>
                        </div>

                        {/*REfunded pending review*/}
                        <div className="flex flex-col items-center py-4 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-3">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">REFUNDED PENDING REVIEW</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.ref_pen_revi}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-red-600 font-semibold"><IoCaretDownSharp className=" mr-1" />0</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-18 text-xl text-gray-500 mb-2 font-semibold">0%</code>
                            </div>
                        </div>

                        {/*Reviewed*/}
                        <div className="flex flex-col items-center py-4 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-3">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">REVIEWED</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.total_review}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-green-600 font-semibold"><FaCaretUp className=" mr-1" />0</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-30 text-xl text-gray-500 mb-2 font-semibold">0%</code>
                            </div>
                        </div>

                        {/*ordered*/}
                        <div className="flex flex-col items-center py-4 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-3">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">ORDERED</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.total_order}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-green-600 font-semibold"><FaCaretUp className=" mr-1" />0</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-28 text-xl text-gray-500 mb-2 font-semibold">0%</code>
                            </div>
                        </div>
                    </ul>







                    {/*third part*/}
                    <ul className="grid grid-cols-3 grid-row-6 space-x-6">

                        {/*REVIEW submitted for refund*/}
                        <div className="flex flex-col items-center py-2 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-6">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">REVIEW SUBMITTED FOR REFUND</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.pending_review}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-green-600 font-semibold"><FaCaretUp className=" mr-1" />0</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-29 text-xl text-gray-500 mb-2">%</code>
                            </div>
                        </div>
                        {/*review deleted*/}
                        <div className="flex flex-col items-center py-2 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-6">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">REVIEW DELETED</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.review_delete}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-red-600 font-semibold"><IoCaretDownSharp className=" mr-1" />0</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-37 text-xl text-gray-500 mb-2">%</code>
                            </div>
                        </div>
                        {/*ON hold*/}
                        <div className="flex flex-col items-center py-2 rounded-xl row-span-3 shadow-xl bg-white">
                            {/*title*/}
                            <div className="flex flex-col items-center gap-y-6">
                                <div className=" ">
                                    <h1 className="text-gray-400 font-semibold ">ON HOLD</h1>
                                </div>
                                {/*counting*/}
                                <div className="mt-2">
                                    <li className="font-semibold text-4xl text-center">
                                        {count.onhold}
                                    </li>
                                </div>
                                {/*lose/profit*/}
                                <div className="">
                                    <p className="flex flex-row items-center text-red-600 font-semibold"><IoCaretDownSharp className=" mr-1" />0</p>
                                </div>
                            </div>
                            {/*%*/}
                            <div className="w-full">
                                <code className="ml-34 text-xl text-gray-500 mb-2">%</code>
                            </div>
                        </div>
                    </ul>


                    {/*fourth part*/}
                    <ul className="grid grid-cols-4 auto-rows-[120px] space-x-8">

                        {/* completed orders */}
                        <div className="flex flex-col rounded-xl col-span-2 row-span-4 shadow-xl bg-white min-h-[350px]">
                            <h1 className="text-gray-600 font-bold text-xl pb-4 p-5 border-b border-gray-100">
                                Completed
                            </h1>

                            <div className="w-full h-100 mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            { name: "Completed", value: count.complete, color: "#16a34a" },
                                            { name: "Cancelled", value: count.cencelled, color: "#dc2626" }
                                        ]}
                                    // margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                                        <Tooltip cursor={{ fill: '#f9fafb' }} />

                                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50}>
                                            <Cell fill="#16a34a" /> {/* Completed ka color Green */}
                                            <Cell fill="#dc2626" /> {/* Cancelled ka color Red */}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        {/* orders by status */}
                        <div className="flex flex-col py-2 rounded-xl col-span-2 row-span-4 shadow-xl bg-white">
                            <h1 className="text-gray-600 font-semibold py-4 px-5">
                                Orders By Status
                            </h1>
                            <hr className="text-gray-300 border" />
                        </div>

                    </ul>



                </div>

            </div>
        </div>
    )
}
export default Dashboard