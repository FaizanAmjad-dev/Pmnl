import dev from "../../assets/Img/profileimg.png";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Delyrefunds() {
    const navigate = useNavigate()
    const id = 'refund_delay'
    const ReportAPI = `http://127.0.0.1:8000/parentapi/supportID/?problem_status=${id}`;
    const token = localStorage.getItem('access-token')
    const [reportData, setReportData] = useState([])
    const [fakereportData, setFakereportData] = useState([])
    useEffect(() => {
        fetch(ReportAPI, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setReportData(data)
                setFakereportData(data)
            })
    }, [])

    const HandleDay = (e) => {
        const term = e
        if (!term) {
            setFakereportData(reportData)
        }
        else {
            const result = reportData.filter((all) => all.total_day.toString().includes(term))
            setFakereportData(result)
        }
    }

    const [productPerpage, setProductPerpage] = useState(7)
    const [pageNumber, setPageNumber] = useState(1)
    const indexOFlastproduct = pageNumber * productPerpage
    const indexOFfirstproduct = indexOFlastproduct - productPerpage
    const currentPage = fakereportData.slice(indexOFfirstproduct, indexOFlastproduct)
    const counter = Math.ceil(fakereportData.length / productPerpage)


    return (
        <div className="bg-gray-200/80 p-2 min-h-screen px-8">
            {/*title*/}
            <div className="w-full h-auto pt-7">
                <h1 className="font-semibold text-3xl text-gray-700"> Delay Refund</h1>
            </div>

            {/*order count*/}
            <div className="w-full h-auto mb-4">
                <h1 className="font-semibold text-gray-500">Total Pending Refund Orders = ({reportData.length})</h1>
            </div>

            {/*sub parent dev*/}
            <div className="flex flex-col mt-5 p-4 w-full border-2 border-gray-300 bg-white/80 rounded-b">

                {/*search part*/}
                <div className="w-full border border-gray-200 shadow-xl rounded-xl bg-white h-16 px-2 py-2 mb-10 flex items-center">
                    <div className="flex flex-row items-center w-full">
                        <FaSearch className="text-gray-400 ml-4" />
                        <input
                            onChange={(e) => HandleDay(e.target.value)}
                            type="search"
                            className="w-full px-3 text-sm text-gray-600 outline-none"
                            placeholder="Search By number of delayed days..."
                        />
                    </div>
                </div>

                {/*main parent dev*/}
                <div className="w-full border border-gray-200 shadow-xl rounded-xl bg-white overflow-hidden mb-10">
                    {/*title*/}
                    <div className="w-full px-6 py-5">
                        <h1 className="text-gray-700 text-xl font-semibold">Sellers </h1>
                    </div>
                    <hr className="w-full text-gray-300 " />

                    {/* table*/}
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-4 font-bold text-gray-700">#</th>
                                <th className="px-4 py-4 font-bold text-gray-700">Name</th>
                                <th className="px-4 py-4 font-bold text-gray-700">Product ID</th>
                                <th className="px-4 py-4 font-bold text-gray-700">Order Creation Date</th>
                                <th className="px-4 py-4 font-bold text-gray-700"># Of Delayed Days</th>
                                <th className="px-4 py-4 font-bold text-gray-700">Order ID</th>
                                <th className="px-4 py-4 font-bold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {currentPage.map((item, index) => (
                                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 text-gray-600">{item.id}</td>
                                    <td className="px-4 py-4 text-green-600 font-medium">{item.user_name}</td>
                                    <td className="px-4 py-4 text-gray-600">{item.product_data?.id}</td>
                                    <td className="px-4 py-4 text-gray-600 text-sm">{new Date(item.Created_at).toLocaleString()}</td>
                                    <td className="px-4 py-4 text-gray-600">{item.total_day ? (item.total_day) : "1"}</td>
                                    <td className="px-4 py-4 text-gray-600 text-sm">{item.ord_data ? (item.ord_data?.id) : ""}</td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => navigate(`/dashboard/product/product_details/${item.product_data?.id}`)}
                                            type="submit"
                                            className="cursor-pointer py-2 px-6 bg-red-700/90 hover:bg-blue-500 text-white rounded transition-colors shadow-sm"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
            {fakereportData.length >= 7 && (
                <div className="flex gap-x-2 justify-center my-4 item-center w-full ">
                    <div>
                        <button
                            className={pageNumber === 1 ? "hidden" : "border border-gray-400 font-semibold shadow rounded bg-gray-200 text-red-800 p-2"}
                            onClick={() => setPageNumber(1)}
                        >
                            First
                        </button>
                    </div>
                    {[...Array(counter)].map((Indexvalue, Indexnumber) => (
                        <div key={Indexnumber + 1} >
                            <button
                                onClick={() => setPageNumber(Indexnumber + 1)}
                                className="border border-gray-400 font-bold shadow rounded bg-gray-200 text-blue-600 p-2">
                                {Indexnumber + 1}
                            </button>
                        </div>
                    ))}
                    <div>
                        <button
                            className={pageNumber === counter || counter === 0 ? " hidden" : "border border-gray-400 font-semibold shadow rounded bg-gray-200 text-red-800 p-2"}
                            onClick={() => setPageNumber(counter)}
                            hidden={pageNumber === counter}
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Delyrefunds;