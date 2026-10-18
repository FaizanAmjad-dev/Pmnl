import whatsapp from "../assets/Img/whatsapp_logo.jpeg"
import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { IoCloseSharp } from "react-icons/io5";

function Refunded_pended() {
        const [close, setClose] = useState(false)
        const role = localStorage.getItem('admin') === 'true'
        const token = localStorage.getItem('access-token')
        const Navigate = useNavigate()
        const order_filter = "Pending"
        const API = `http://127.0.0.1:8000/parentapi/orderfilter/?order_status=${order_filter}`
        const [reciever, setReciever] = useState([])
        const [fakeData, setFakeData] = useState([])
        // pagination
        const [productPerpage, setProductPerpage] = useState(7)
        const [pageNumber, setPageNumber] = useState(1)
        useEffect(() => {
                fetch(API, {
                        headers: {
                                "Authorization": `Bearer ${token}`
                        }
                })
                        .then((data) => {
                                if (data.status == 401) {
                                        return []
                                }
                                else {
                                        return data.json()
                                }
                        })
                        .then((res) => {
                                setReciever(res)
                                setFakeData(res)
                        })
        }, [token])
        // pagination
        const indexOflastproduct = pageNumber * productPerpage
        const indexOffirstproduct = indexOflastproduct - productPerpage
        const currentPage = fakeData.slice(indexOffirstproduct, indexOflastproduct)
        const totalPage = Math.ceil(fakeData.length / productPerpage)
        // ya issu ka part hai 
        const ReportAPI = 'http://127.0.0.1:8000/parentapi/support/'
        const [data, setData] = useState({
                order: "",
                problem_status: "",
                subject: "Direct Report",
        })
        const HandleInput = (e) => {
                setData({ ...data, [e.target.name]: e.target.value })
        }
        const HandelSubmit = (e) => {
                e.preventDefault();
                let carry = new FormData();
                Object.keys(data).forEach((key) => {
                        carry.append(key, data[key])
                })

                fetch(ReportAPI, {
                        method: "POST",
                        headers: ({
                                "Authorization": `Bearer ${token}`
                        }),
                        body: carry
                })
                        .then((res) => res.json())
                        .then((data) => {
                                if (data) {
                                        window.alert("success")
                                }
                                else {
                                        window.alert("Somthing wrong")
                                }
                        })

        }
        // search by email filter 
        const [email, setEmail] = useState('')
        const EmailQuery = (e) => {
                e.preventDefault();
                setPageNumber(1)
                const term = email.toLowerCase()
                if (!term) {
                        setFakeData(reciever)
                }
                else {
                        const filter = reciever.filter((prev) => prev.cus_em_ad.toLowerCase().includes(term))
                        setFakeData(filter)
                }
        }

        // search by product id
        const [product, setProduct] = useState('')
        const ProductQuery = (e) => {
                e.preventDefault();
                const term = product
                setPageNumber(1)
                if (!term) {
                        setFakeData(reciever)
                }
                else {
                        const filter = reciever.filter((prev) => prev.info?.id.toString().includes(term))
                        setFakeData(filter)
                }
        }

        // search by order id
        const [sid, setSid] = useState("")
        const SearchID = (e) => {
                e.preventDefault();
                const term = sid;
                setPageNumber(1)
                if (!term) {
                        setFakeData(reciever)
                }
                else {
                        const filt = reciever.filter((com) => com.id.toString().includes(term))
                        setFakeData(filt)
                }
        }

        return (
                <div className="relative bg-gray-200/80 min-h-screen px-4 h-full">
                        <div className="w-full h-auto pt-5">
                                <h1 className="font-semibold text-3xl text-gray-700">Orders</h1>
                        </div>
                        {/* report porshion */}
                        {close && (
                                <div className="fixed inset-0 z-50 bg-black/50 min-h-screen flex justify-center"
                                        onClick={() => setClose(false)}
                                >
                                        <div className="flex flex-col w-130 h-60 rounded-xl bg-white shadow-xl "
                                                onClick={(e) => e.stopPropagation()}>
                                                {/* title */}
                                                <div className="py-6 px-8 flex justify-between">
                                                        <h1 className="text-2xl font-normal text-gray-600 ">Select the issue</h1>
                                                        <button onClick={() => setClose(false)}>
                                                                <IoCloseSharp className="text-gray-400 text-2xl" />
                                                        </button>
                                                </div>
                                                <hr className="w-full text-gray-300" />

                                                <form action="" onSubmit={HandelSubmit}>
                                                        {/* subject */}
                                                        <input
                                                                type="text"
                                                                hidden
                                                                readOnly
                                                                onChange={HandleInput}
                                                                value={data.subject}
                                                                name="subject"
                                                        />
                                                        {/* Issue part */}
                                                        <div className="my-6 px-10">
                                                                <select
                                                                        onChange={HandleInput}
                                                                        value={data.problem_status}
                                                                        name="problem_status"
                                                                        className="border border-gray-300 py-2 px-2 w-full rounded-xl outlin-none focus:outline-none ">
                                                                        {role ? (
                                                                                <>
                                                                                        <option value="">Select Issue</option>
                                                                                        <option value="product_returned_after_refund">Product Returned After Refund</option>
                                                                                        <option value="negative_review">Negative Review</option>
                                                                                        <option value="other_issue">Other Issue</option>
                                                                                </>
                                                                        ) : (
                                                                                <>
                                                                                        <option value="">Select Issue</option>
                                                                                        <option value="refund_delay">Refund Delay</option>
                                                                                        <option value="commission_issue">Commission Issue</option>
                                                                                        <option value="less_refund">Less Refund</option>
                                                                                        <option value="wrong_refund_screenshot">Wrong Refund Screenshot</option>
                                                                                        <option value="dispute">Dispute</option>
                                                                                </>
                                                                        )}
                                                                </select>
                                                        </div>

                                                        <hr className="w-full text-gray-300" />
                                                        {/* button part */}
                                                        <button
                                                                onClick={HandelSubmit}
                                                                className="border hover:bg-gray-700 cursor-pointer border-gray-300 bg-gray-300 p-2 my-4 w-30 ml-90 rounded text-gray-600 font-semibold">
                                                                Report
                                                        </button>
                                                </form>
                                        </div>
                                </div>
                        )}

                        {/*main div */}
                        <div className="flex flex-col border border-gray-300 shadow-2xl bg-white mt-8  p-4">
                                {/*search bar div*/}
                                <div className="w-full ">
                                        <div className="space-y-6">
                                                <div className="w-full rounded-b-xl shadow-xl  ">
                                                        <form action="" onSubmit={EmailQuery}>
                                                                <div className=" flex flex-row ">
                                                                        <input
                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                type="search" className="w-full  bg-gray-200 border border-gray-500 py-2 h-11 px-2 mb-4 outline-none hover:border-gray-500 hover:border font-semibold " placeholder=" Search by customer email ..." />
                                                                        <button className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden  " ></button>
                                                                </div>
                                                        </form>
                                                </div>
                                                <div className="w-full rounded-b-xl shadow-xl ">
                                                        <form action="" onSubmit={ProductQuery}>
                                                                <div className=" flex flex-row ">
                                                                        <input
                                                                                onChange={(e) => setProduct(e.target.value)}
                                                                                type="search" className="w-full bg-gray-200 border border-gray-500 py-2 h-11 px-2 mb-4 outline-none hover:border-gray-500 hover:border font-semibold " placeholder=" Search by product ID ..." />
                                                                        <button type="submit" className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden  " ></button>

                                                                </div>
                                                        </form>
                                                </div>
                                                <div className="w-full rounded-b-xl shadow-xl ">
                                                        <form action="" onSubmit={SearchID}>
                                                                <div className=" flex flex-row ">
                                                                        <input
                                                                                onChange={(e) => setSid(e.target.value)}
                                                                                type="search" className="w-full bg-gray-200 border border-gray-500 py-2 h-11 px-2 mb-4 outline-none hover:border-gray-500 hover:border font-semibold " placeholder=" Search by order # ..." />
                                                                        <button type="submit" className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden  " ></button>
                                                                </div>
                                                        </form>
                                                </div>

                                        </div>
                                </div>
                                {/* Table Div */}
                                <div className="w-full shadow-xl bg-white rounded-t-xl mt-6 overflow-x-auto">
                                        <div className="w-full px-4 py-2">
                                                <h1 className="font-semibold text-gray-700">Active Orders</h1>
                                        </div>

                                        <table className="w-full border-t border-gray-300">
                                                <thead>
                                                        <tr className="bg-gray-100 border-b border-gray-300">
                                                                <th className="px-4 py-2 text-gray-500 text-center">#</th>
                                                                <th className="px-4 py-2 text-gray-500 text-center">Seller</th>
                                                                <th className="px-4 py-2 text-gray-500 text-center">User</th>
                                                                <th className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">Order Number</th>
                                                                <th className="px-4 py-2 text-gray-500 text-center">Product</th>
                                                                <th className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">Customer Email</th>
                                                                <th className="px-4 py-2 text-gray-500 text-center">Market</th>
                                                                <th className="px-4 py-2 text-gray-500 text-center">Type</th>
                                                                <th className="px-4 py-2 text-gray-500 text-center">Report</th>
                                                                <th className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">Update Date</th>
                                                                <th className="px-4 py-2 text-gray-500 text-center">Status</th>
                                                                <th className="px-4 py-2 text-gray-500 text-center">Action</th>
                                                        </tr>
                                                </thead>

                                                {currentPage.map((list, index) => (
                                                        <tbody key={index} className="border-b border-gray-300">
                                                                <tr className="border-b border-gray-200 hover:bg-gray-50">

                                                                        <td className="p-4 text-center whitespace-nowrap">111</td>
                                                                        <td className="p-4 whitespace-nowrap">
                                                                                <div className="flex flex-col items-center justify-center">
                                                                                        <img src={whatsapp} alt="whatsapp" className="w-10 h-10 rounded-full object-cover" />
                                                                                        <span className="text-gray-600 text-xs mt-1">400</span>
                                                                                </div>
                                                                        </td>
                                                                        <td className="p-4 whitespace-nowrap">
                                                                                <div className="flex flex-col items-center justify-center">
                                                                                        <img src={whatsapp} alt="user" className="w-10 h-10 rounded-full object-cover" />
                                                                                        <span className="text-gray-600 text-xs mt-1">400</span>
                                                                                </div>
                                                                        </td>
                                                                        <td className="p-4 text-center whitespace-nowrap text-gray-600">{list.or_nu}</td>
                                                                        <td className="p-4 text-center">
                                                                                <img src={list.info.amz_pic} alt="product" className="w-16 h-auto mx-auto object-cover" />
                                                                        </td>
                                                                        <td className="p-4 text-center whitespace-nowrap text-gray-600">
                                                                                {/* {list.cus_em_ad} */}
                                                                                {list.cus_em_ad}
                                                                        </td>
                                                                        <td className="p-4 text-center whitespace-nowrap text-gray-600">{list.info.country}</td>
                                                                        <td className="p-4 text-center whitespace-nowrap text-gray-600">{list.info.product_t}</td>
                                                                        <td className="p-4 text-center">
                                                                                <button
                                                                                        onClick={() => {
                                                                                                setData({
                                                                                                        ...data,  order: list.id,
                                                                                                        product:list.info?.id
                                                                                                })
                                                                                                setClose(true)
                                                                                        }}
                                                                                        className="bg-green-500 hover:bg-blue-400 py-2 px-3 rounded text-white text-sm transition-colors">
                                                                                        Report
                                                                                </button>
                                                                        </td>
                                                                        <td className="p-4 text-center whitespace-nowrap text-gray-600">{new Date(list.date_time).toLocaleString()}</td>
                                                                        <td className="p-4 text-center whitespace-nowrap text-gray-600">{list.order_status}</td>
                                                                        <td className="p-4 text-center">
                                                                                <button
                                                                                        onClick={() => Navigate(`/dashboard/order/order_details/${list.id}/`)}
                                                                                        className="bg-green-500 hover:bg-green-400 py-2 px-4 rounded text-white text-sm transition-colors">
                                                                                        View
                                                                                </button>
                                                                        </td>
                                                                </tr>
                                                        </tbody>
                                                ))}
                                        </table>
                                </div>
                                {fakeData.length > 7 && (
                                        <div className="flex gap-x-2 justify-center my-4 item-center w-full ">
                                                <div>
                                                        <button
                                                                className={pageNumber === 1 ? "hidden" : "border border-gray-400 font-semibold shadow rounded bg-gray-200 text-red-800 p-2"}
                                                                onClick={() => setPageNumber(1)}
                                                        >
                                                                First
                                                        </button>
                                                </div>
                                                {[...Array(totalPage)].map((Indexvalue, Indexnumber) => (
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
                                                                className={pageNumber === totalPage || totalPage === 0 ? " hidden" : "border border-gray-400 font-semibold shadow rounded bg-gray-200 text-red-800 p-2"}
                                                                onClick={() => setPageNumber(totalPage)}
                                                                hidden={pageNumber === totalPage}
                                                        >
                                                                Last
                                                        </button>
                                                </div>
                                        </div>
                                )}
                        </div>
                </div>
        )
}
export default Refunded_pended