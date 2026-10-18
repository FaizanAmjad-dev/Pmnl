import { useEffect, useState } from "react";
import search from "../assets/Img/search_white.png"
import { data, useNavigate } from "react-router-dom";
import whatsapp from "../assets/Img/whatsapp_logo.jpeg"
import { FaRegEye } from "react-icons/fa";

function Enabled() {
    const navigate = useNavigate()
    const token = localStorage.getItem('access-token')
    const API = "http://127.0.0.1:8000/parentapi/api/"
    const [reciever, setReciever] = useState([])
    const [fakedata, setFakedata] = useState([])
    // pagination
    const [productPerpage, setProductPerpage] = useState(7)
    const [pageNumber, setPageNumber] = useState(1)

    const APIEnv = () => {
        fetch(API, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((converter) => {
                if (converter.status === 401) {
                    return []
                }
                return converter.json()
            })
            .then((data) => {
                setReciever(data)
                setFakedata(data)
            })
    }

    useEffect(() => {
        APIEnv()
    }, [])

    // pagination
    const indexOFlastproduct = pageNumber * productPerpage
    const indexOFfirstproduct = indexOFlastproduct - productPerpage
    const currentPage = fakedata.slice(indexOFfirstproduct, indexOFlastproduct)
    const totalPage = Math.ceil(fakedata.length / productPerpage)

    // enable page 
    const EnabledPop = async (id, currentData) => {
        const Sender = await fetch(`${API}${id}/`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                is_active: currentData
            })
        })
        if (Sender.ok) {
            APIEnv()
        }
    }

    // keyword search
    const [word, setWord] = useState('')
    const Handlekey = (e) => {
        e.preventDefault();
        const term = word.toLowerCase()
        if (!term) {
            setFakedata(reciever)
        }
        else {
            const keyfilter = reciever.filter((data) => data.keyword.toLowerCase().includes(term))
            setFakedata(keyfilter)
        }
    }

    // market search
    const market = (e) => {
        const term = e.toLowerCase()
        if (!term) {
            setFakedata(reciever)
        }
        else {
            const marketfilter = reciever.filter((data) => data.country.toLowerCase().includes(term))
            setFakedata(marketfilter)
        }
    }
    // product typ e search
    const ReviewFilt = (e) => {
        const term = e.toLowerCase()
        if (!term) {
            setFakedata(reciever)
        }
        else {
            const marketfilter = reciever.filter((data) => data.product_t.toLowerCase().includes(term))
            setFakedata(marketfilter)
        }
    }
    // product search
    const [product, setProduct] = useState('')
    const Handleprdouct = (e) => {
        e.preventDefault();
        const term = product
        if (!term) {
            setFakedata(reciever)
        }
        else {
            const keyfilter = reciever.filter((data) => data.id.toString().includes(term))
            setFakedata(keyfilter)
        }
    }



    return (
        <div className="bg-gray-200/80 min-h-screen px-10 pt-10 h-full">
            <div className="w-full h-auto pt-7">
                <h1 className="font-semibold text-3xl text-gray-700">Products</h1>
            </div>
            {/*main div */}
            <div className="flex flex-col border border-gray-300 shadow-2xl bg-white mt-8 p-4">
                {/*search bar div*/}
                <div className="w-full ">
                    {/* search by product Code */}
                    <form action="" onSubmit={Handleprdouct}>
                        <div className="w-full rounded-b-xl shadow-xl">
                            <div className=" flex flex-row ">
                                <input
                                    onChange={(e) => setProduct(e.target.value)}
                                    type="search" className="w-full bg-gray-200 border border-gray-500 py-2 h-11 px-2 mb-4 " placeholder=" Search by Product Code ..." />
                                <button
                                    className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden  " >
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="w-full flex flex-col h-auto shadow-xl ">
                        <div>
                            {/* search by market */}
                            <select
                                onChange={(e) => market(e.target.value)}
                                name="" id="" className="w-full border border-gray-500 bg-gray-200 py-2 text-gray-500">
                                <option value="">Select Market</option>
                                <option value="US">US</option>
                                <option value="UK">UK</option>
                                <option value="DE">DE</option>
                                <option value="IT">IT</option>
                                <option value="CA">CA</option>
                                <option value="ES">ES</option>
                                <option value="AUS">AUS</option>
                                <option value="JAPAN">JAPAN</option>
                                <option value="KSA">KSA</option>
                                <option value="UAE">UAE</option>
                                <option value="General">General</option>
                                <option value="FR">FR</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Russia">Russia</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Netherland">Netherland</option>
                                <option value="US-High Commission">US-High Commission</option>
                                <option value="Walmart-US">Walmart-US</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Kindle Books">Kindle Books</option>
                                <option value="ETSY">ETSY</option>
                                <option value="Singapore">Singapore</option>
                                <option value="India">India</option>
                                <option value="Kindle US">Kindle US</option>
                                <option value="eBay US">eBay US</option>
                                <option value="Wlamart-CA">Wlamart-CA</option>
                                <option value="Ali Express">Ali Express</option>
                                <option value="Temu-US">Temu-US</option>
                                <option value="Otto-DE">Otto-DE</option>
                                <option value="Googl Reviews UK">Googl Reviews UK</option>
                                <option value="Taobao">Taobao</option>
                                <option value="TikTok UK">TikTok UK</option>
                                <option value="Wayfair UK">Wayfair UK</option>
                                <option value="Wayfair US">Wayfair US</option>
                                <option value="Brazil">Brazil</option>
                                <option value="TikTOk DE">TikTOk DE</option>
                            </select>
                        </div>
                        {/* search by type */}
                        <div>
                            <select onChange={(e) => ReviewFilt(e.target.value)} name="" id="" className="w-full border border-gray-500 bg-gray-200 py-2 text-gray-500">
                                <option value="">All</option>
                                <option value="Text Review">Text Review</option>
                                <option value="Top Reviewer">Top Reviewer</option>
                                <option value="no review">no review</option>
                                <option value="Feedback">Feedback</option>
                                <option value="Rating">Rating</option>
                                <option value="RAS">RAS</option>
                                <option value="RAO">RAO</option>
                                <option value="Seller Testing">Seller Testing</option>
                                <option value="Pic Review">Pic Review</option>
                                <option value="Vid Review">Vid Review</option>
                            </select>
                        </div>
                        {/* keyword */}
                        <form action="" onSubmit={Handlekey}>
                            <div className=" flex flex-row ">
                                <input
                                    onChange={(e) => setWord(e.target.value)}
                                    type="search"
                                    className="w-full bg-gray-200 border border-gray-500 py-2 h-11 px-2  " placeholder=" Search by Keyword ..." />
                                <button
                                    type="image" className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden  " >
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* search seller ID */}
                    <div className="w-full rounded-b-xl shadow-xl ">
                        <div className=" flex flex-row ">
                            <input type="search" className="w-full bg-gray-200 border border-gray-500 py-2 h-11 px-2 mb-4 " placeholder=" Search by Seller ID ..." />
                            <input type="image" src={search} className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden  " />
                        </div>
                    </div>

                </div>
                {/*active order Parts*/}
                <div className="w-full shadow-2xl bg-white rounded-t-xl mt-6">
                    {/*acitve order div*/}
                    <div className="w-full px-2 py-3 ">
                        <h1 className="font-semibold text-gray-700">Active Products</h1>
                    </div>
                    <hr className="text-gray-400" />

                </div>
                {/* table name part*/}
                <div className="overflow-y-hidden">

                    <table className="">
                        <thead className="border-b border-gray-400">
                            <tr className="bg-gray-100 py-3">
                                <th className="px-10 text-gray-500">Seller</th>
                                <th className="px-16 py-2 text-gray-500">Market</th>
                                <th className="px-16 py-2 whitespace-nowrap text-gray-500">Sale Limit</th>
                                <th className="px-16 py-2 whitespace-nowrap text-gray-500">Today Remaining</th>
                                <th className="px-16 py-2 whitespace-nowrap text-gray-500">Total Remaining</th>
                                <th className="px-16 py-2 text-gray-500">Commission</th>
                                <th className="px-16 py-2 text-gray-500">Keyword</th>
                                <th className="px-16 py-2 text-gray-500">Product ID</th>
                                <th className="px-16 py-2 text-gray-500">Image</th>
                                <th className="px-16 py-2 text-gray-500"></th>
                                <th className="px-16 py-2 text-gray-500"></th>
                            </tr>
                        </thead>
                        {currentPage.map((list, index) => (
                            <tbody key={index} className={`border-b border-gray-400 ${list.is_active ? "opacity-100" : "opacity-50"}`} >
                                <tr className="text-center mt-3 py-2">
                                    <td className="text-gray-600 px-10">
                                        <a href="#" className="">
                                            <img src={whatsapp} alt="" className="object-cover rounded-full overflow-hidden" />
                                        </a>
                                        <br />
                                        <span>400</span>
                                    </td>
                                    <td className="py-2 px-17 text-gray-500">{list.country}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.selle_limit}</td>
                                    <td className="py-2 px-17 text-gray-500">4</td>
                                    <td className="py-2 px-17 text-gray-500">{list.overall_salle_limit}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.adver_commission}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.keyword}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.id}</td>
                                    <td className="py-2 px-17 text-gray-500 flex justify-center overflow-hidden ">
                                        <img src={list.picture} className="object-cover w-auto h-14 " alt="" />
                                    </td>
                                    <td className="h-10 w-20 text-white text-sm">
                                        <button
                                            onClick={() => navigate(`/dashboard/product/product_details/${list.id}`)}
                                            type="submit"
                                            className="flex flex-row border border-green-600 hover:border hover:border-blue-600 px-3 py-2 outline-none hover:outline-none rounded bg-green-700 hover:bg-blue-600">
                                            <FaRegEye className="mt-1 mr-2" />
                                            <p>view</p>
                                        </button>
                                    </td>
                                    <td className="h-10 w-40 ">
                                        <button
                                            onClick={() => EnabledPop(list.id, true)}
                                            type="submit"
                                            className="rounded px-3 py-2 text-sm border border-green-700 bg-green-700 text-white hover:bg-blue-700 outline-none">Enable
                                        </button>
                                    </td>

                                </tr>
                            </tbody>
                        ))}
                    </table>

                </div>
                {fakedata.length >= 0 ? "" : (
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
export default Enabled