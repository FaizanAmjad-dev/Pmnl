import { useEffect, useState } from "react";
import search from "../assets/Img/search_white.png"
import whatsapp from "../assets/Img/whatsapp_logo.jpeg"
import { FaRegEye } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Gaming_devices() {

    const token = localStorage.getItem('access-token')
    // ya pai hai 
    const category_filter = 'Gaming Product'
    const API = `http://127.0.0.1:8000/parentapi/filterProduct/?category=${encodeURIComponent(category_filter)}`
    const [reciever, setReciever] = useState([])
    // ys kake arry hai 
    const [filterreceiver, setFilterreceiver] = useState([])
    // pagenation
    const [productPerpage, setProductPerpage] = useState(7)
    const [pageNumber, setPageNumber] = useState(1)
    const getProducts = () => {
        fetch(API, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((converter) => {
                if (!converter) {
                    return [];
                } else {
                    return converter.json();
                }
            })
            .then((data) => {
                setReciever(data);
                setFilterreceiver(data);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    // pagination other logic
    const indexOflastproduct = pageNumber * productPerpage
    const indexOffirstproduct = indexOflastproduct - productPerpage
    const currentPage = filterreceiver.slice(indexOffirstproduct, indexOflastproduct)
    const totalPages = Math.ceil(filterreceiver.length / productPerpage)

    const Res_api = 'http://127.0.0.1:8000/parentapi/reservation/'
    const reservation = async (id) => {
        const data = await fetch(Res_api, {
            method: "POST",
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({
                re_product: id
            })
        })
        if (data.ok) {
            alert("Reserved Product");
            getProducts();
        }
        else {
            alert(res.error)
        }
    }


    // keword filter
    const [value, setValue] = useState("")
    const SearchFilter = (e) => {
        e.preventDefault();
        const term = value.toLowerCase();
        if (!term) {
            setFilterreceiver(reciever)
        }
        else {
            const filt = reciever.filter((com) => com.keyword.toLowerCase().includes(term))
            setFilterreceiver(filt)
        }
    }

    // id filter 
    const [sid, setSid] = useState("")
    const SearchID = (e) => {
        e.preventDefault();
        const term = sid;
        if (!term) {
            setFilterreceiver(reciever)
        }
        else {
            const filt = reciever.filter((com) => com.id.toString().includes(term))
            setFilterreceiver(filt)
        }
    }

    // Product codd 
    const [pcode, setPcode] = useState("")
    const Codefilter = (e) => {
        e.preventDefault();
        const term = pcode;
        if (!term) {
            setFilterreceiver(reciever)
        }
        else {
            const co = reciever.filter((data) => data.id.toString().includes(term))
            setFilterreceiver(co)
        }
    }

    // market search filter 
    const Market = (e) => {
        const term = e.toLowerCase();
        if (!term) {
            setFilterreceiver(reciever)
        }
        else {
            const marketfilter = reciever.filter((data) => data.country.toLowerCase().includes(term))
            setFilterreceiver(marketfilter)
        }
    }

    // review serch filter 
    const ReviewFilt = (e) => {
        const term = e.toLowerCase();
        if (!term) {
            setFilterreceiver(reciever)
        }
        else {
            const Rev = reciever.filter((data) => data.product_t.toLowerCase().includes(term))
            setFilterreceiver(Rev)
        }
    }
    // yaha par navigation hai 
    const navigate = useNavigate()
    const okk = (id) => {
        navigate(`/dashboard/product/product_details/${id}`)
    }

    // yaha par reservation use ho raha hai 
    // const Rser = (id) => {
    //     navigate(`/dashboard/reservation/show/${id}`)
    // }


    return (
        <div className="bg-gray-200/80 min-h-screen px-10 pt-10 h-full">
            <div className="w-full h-auto pt-7">
                <h1 className="font-semibold text-3xl text-gray-700">Products</h1>
            </div>
            {/*main div */}
            <div className="flex flex-col border border-gray-300 shadow-2xl bg-white mt-8 p-4">
                {/*search bar div*/}
                <div className="w-full ">

                    <div className="w-full rounded-b-xl shadow-xl">
                        <form onSubmit={Codefilter} action="">
                            <div className=" flex flex-row " >
                                <input onChange={(e) => setPcode(e.target.value)} type="search" className="w-full bg-gray-200 border border-gray-500 py-2 h-11 px-2 mb-4 " placeholder=" Search by Product Code ..." />
                                <button className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden" ><FaSearch className="text-white size-5 ml-34" /></button>
                            </div>
                        </form>
                    </div>

                    <div className="w-full flex flex-col h-auto shadow-xl ">
                        <div>
                            <select onChange={(e) => Market(e.target.value)} name="" id="" className="w-full border border-gray-500 bg-gray-200 py-2 text-gray-500">
                                <option value="">All</option>
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
                        <form action="" onSubmit={SearchFilter}>
                            <div className=" flex flex-row ">
                                <input type="search" onChange={(e) => setValue(e.target.value)} value={value} className="w-full bg-gray-200 border border-gray-500 py-2 h-11 px-2  " placeholder=" Search by Keyword ..." />
                                <button onClick={SearchFilter} className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden" ><FaSearch className="text-white size-5 ml-34" /></button>
                            </div>
                        </form>
                    </div>

                    <form action="" onSubmit={SearchID}></form>
                    <div className="w-full rounded-b-xl shadow-xl ">
                        <div className=" flex flex-row ">
                            <input type="search" onChange={(e) => setSid(e.target.value)} className="w-full bg-gray-200 border border-gray-500 py-2 h-11 px-2 mb-4 " placeholder=" Search by Seller ID ..." />
                            <button onClick={SearchID} className="w-100 h-11 bg-blue-500 border-t border-b border-r object-cover overflow-hidden" ><FaSearch className="text-white size-5 ml-34" /></button>
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
                            <tbody key={index} className="border-b border-gray-400">
                                <tr className="text-center mt-3 py-2">
                                    <td className="text-gray-600 px-10">
                                        <a href="#" className="">
                                            <img src={whatsapp} alt="" className="object-cover rounded-full overflow-hidden" />
                                        </a>
                                        <br />
                                        <span>{list.user_name}</span>
                                    </td>
                                    <td className="py-2 px-17 text-gray-500">{list.country}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.selle_limit}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.to_re}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.overall_salle_limit}</td>
                                    {/* <td className="py-2 px-17 text-gray-500 whitespace-nowrap ">{list.product_t}</td> */}
                                    <td className="py-2 px-17 text-gray-500">{list.adver_commission}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.keyword}</td>
                                    <td className="py-2 px-17 text-gray-500">{list.id}</td>
                                    <td className="py-2 px-17 text-gray-500 flex justify-center overflow-hidden ">
                                        <img src={list.picture} className="object-cover w-auto h-14 " alt="" />
                                    </td>
                                    <td className="py-2 px-17 text-green-500">
                                        <button
                                            onClick={() => reservation(list.id)}
                                            type="submit"
                                            className="whitespace-nowrap rounded px-3 py-2 text-sm border border-green-700 hover:text-white hover:bg-green-700 outline-none">Reserve Now
                                        </button>
                                    </td>
                                    <td className="h-10 w-20 text-white text-sm">
                                        <button
                                            onClick={() => okk(list.id)}
                                            type="submit"
                                            className="flex flex-row border border-green-600 hover:border hover:border-blue-600 px-3 py-2 outline-none hover:outline-none rounded bg-green-700 hover:bg-blue-600">
                                            <FaRegEye className="mt-1 mr-2" />
                                            <p>view</p>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>

                </div>
                {filterreceiver.length >= 0 ? "" : (
                    <div className="flex gap-x-2 justify-center my-4 item-center w-full ">
                        <div>
                            <button
                                className={pageNumber === 1 ? "hidden" : "border border-gray-400 font-semibold shadow rounded bg-gray-200 text-red-800 p-2"}
                                onClick={() => setPageNumber(1)}
                            >
                                First
                            </button>
                        </div>
                        {[...Array(totalPages)].map((Indexvalue, Indexnumber) => (
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
                                className={pageNumber === totalPages || totalPages === 0 ? " hidden" : "border border-gray-400 font-semibold shadow rounded bg-gray-200 text-red-800 p-2"}
                                onClick={() => setPageNumber(totalPages)}
                                hidden={pageNumber === totalPages}
                            >
                                Last
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div >
    )
}
export default Gaming_devices