import picture from "../assets/Img/pic.webp"
import { useState, useEffect, useRef } from "react"
import { Form, useNavigate, useParams } from "react-router-dom"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import 'yet-another-react-lightbox'
import Lightbox from "yet-another-react-lightbox";
import { MdOutlineContentCopy } from "react-icons/md";

function Order_Details() {
    const [close, setClose] = useState(false)

    const [imageZoom, setImageZoom] = useState(false)
    const [reImage, setReImage] = useState(false)
    const [reP, setReP] = useState(false)
    const role = localStorage.getItem('admin') === "true"

    const [pop, setPop] = useState(false)
    const token = localStorage.getItem('access-token')
    const { id } = useParams()
    const API = 'http://127.0.0.1:8000/parentapi/submitID/'
    const [recieve, setRecieve] = useState({})
    useEffect(() => {
        fetch(`${API}${id}/`, {
            headers: ({
                "Authorization": `Bearer ${token}`
            })
        })
            .then((res) => res.json())
            .then((data) => setRecieve(data))
    }, [id, token])

    //  update order
    const [updateorder, setUpdateorder] = useState({
        // ya product ka par hai
        product_id: "",
        country: "",
        // ya order ka part hai
        or_nu: "",
        amz_re_li: "",
        remark: "",
        order_status: "",
    })

    const EditButton = (list) => {
        setUpdateorder({
            // ya product ke part hai
            product_id: list.product || list.info?.id,
            country: list.info?.country,
            // ya order ka part hai
            or_nu: list.or_nu,
            amz_re_li: list.amz_re_li,
            remark: list.remark,
            order_status: list.order_status,
        })
    }

    const handleInput = (e) => {
        setUpdateorder({ ...updateorder, [e.target.name]: e.target.value })
    }
    const HandelSubmit = (e) => {
        e.preventDefault();
        const payLoad = {
            country: updateorder.country,
            or_nu: updateorder.or_nu,
            amz_re_li: updateorder.amz_re_li,
            remark: updateorder.remark,
            order_status: updateorder.order_status,
            product: updateorder.product_id
        }

        fetch(`${API}${id}/`, {
            method: "PATCH",
            headers: ({
                'Authorization': `Bearer ${token}`,
                "Content-type": 'application/json'
            }),
            body: JSON.stringify(payLoad)
        })
            .then((res) => res.json())
            .then((data) => {
                setRecieve(data)
                if (data) {
                    alert("Update")
                }
                else {
                    alert("something wrong")
                }
            })

    }

    const HandelImage = (e) => {
        const filelink = e.target.files[0]
        const filename = e.target.name
        // e.preventDefault();
        if (!filename) return;
        let imaginary = new FormData();
        imaginary.append(filename, filelink)


        fetch(`${API}${id}/`, {
            method: "PATCH",
            headers: ({
                'Authorization': `Bearer ${token}`
            }),
            body: imaginary
        })
            .then((res) => res.json())
            .then((data) => {
                setRecieve(data)

            })
    }



    const refData = useRef()
    const [text, setText] = useState(false)
    const handleMouseDowm = () => {
        if (refData) {
            const Clipboard = navigator.clipboard.writeText(refData.current.innerText)

        }
        setText(true)
    }
    const handelMouseUp = () => {
        setText(false)
    }


    return (
        <div className="bg-gray-200/80 min-h-screen">
            <div>
                {/*name/heading*/}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"></div>
                <div className="w-full h-auto ml-8 pt-10">
                    <div><h1 className="font-sm text-gray-500">OVERVIEW</h1></div>
                    <div><h1 className="font-semibold text-3xl text-gray-700">Order Details</h1></div>
                </div>

            </div>

            {/*parent diev*/}

            <div className="flex flex-row gap-x-6 px-10 ">

                {/* Product image detial */}
                <div className="flex flex-col self-start items-center w-120 h-auto p-2 bg-white rounded-xl shadow-xl mt-6 mb-3">

                    {/* First Image - Order Picture */}
                    <div className="flex flex-col items-center w-full border-b border-b-gray-200 h-auto px-4 pb-3">
                        <div className="font-semibold text-xl text-center text-gray-700 mt-5 mb-2">
                            Order Picture
                        </div>

                        {/* Image 1 */}
                        <div
                            onClick={() => setImageZoom(true)}
                            className="w-100 h-auto overflow-hidden mb-1">
                            <img src={recieve.or_pic} alt="" className="object-cover w-full h-full" />
                        </div>

                        {/* image zoom part  */}
                        {imageZoom && (
                            <div
                                className="fixed inset-0 fles items-center justify-center bg-black/50"
                            >
                                {/* close button */}
                                <button
                                    className="absolute top-6 right-6 text-white text-3xl font-light z-50 cursor-pointer p-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImageZoom(false)
                                    }}
                                >
                                    X
                                </button>

                                {/* image zoom part */}
                                <div
                                    className="relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={recieve.or_pic}
                                        alt=""
                                        className="w-full h-auto object-contain px-70 py-40"
                                    />
                                </div>
                            </div>

                        )}

                        {/*input field 1*/}
                        {role ? "" : (
                            <>
                                <input type="file" id="A1" hidden onChange={HandelImage} name="or_pic" />
                                {/* Button */}
                                <div className="flex justify-center mt-2 mb-2">
                                    <label htmlFor="A1" className="flex items-center gap-2 border border-green-500 text-green-500 px-4 py-1.5 rounded-full hover:bg-green-50 text-sm">
                                        Change Pic
                                    </label>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Second Image - Refund Picture */}
                    <div className="flex flex-col items-center w-full border-b border-b-gray-200 h-auto px-4 pb-3">
                        <div className="font-semibold text-xl text-center text-gray-700 mt-4 mb-2">
                            Refund Picture
                        </div>

                        {/* Image 2 */}
                        <div
                            onClick={() => setReImage(true)}
                            className="w-100 h-auto overflow-hidden mb-1">
                            <img src={recieve.re_fund_pic} alt="" className="object-cover w-full h-full" />
                        </div>
                        {/* image zoom part  */}
                        {reImage && (
                            <div
                                className="fixed inset-0 fles items-center justify-center bg-black/50"
                            >
                                {/* close button */}
                                <button
                                    className="absolute top-6 right-6 text-white text-3xl font-light z-50 cursor-pointer p-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setReImage(false)
                                    }}
                                >
                                    X
                                </button>

                                {/* image zoom part */}
                                <div
                                    className="relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={recieve.re_fund_pic}
                                        alt=""
                                        className="w-full h-auto object-contain px-70 py-40"
                                    />
                                </div>
                            </div>

                        )}
                        {role ? (
                            <>
                                {/*input field 2*/}
                                <input type="file" id="B1" hidden onChange={HandelImage} name="re_fund_pic" />
                                {/* Button */}
                                <div className="flex justify-center mt-2 mb-2">
                                    <label htmlFor="B1" className="flex items-center gap-2 border border-green-500 text-green-500 px-4 py-1.5 rounded-full hover:bg-green-50 text-sm">
                                        Change Pic
                                    </label>
                                </div>
                            </>
                        ) : ""}
                    </div>

                    {/* Third Image - Review Picture */}
                    <div className="flex flex-col items-center w-full px-4 pb-3">
                        <div className="font-semibold text-xl text-center text-gray-700 mt-4 mb-2">
                            Review Picture
                        </div>

                        {/* Image 3 */}
                        <div
                            onClick={() => setReP(true)}
                            className="w-100 h-auto overflow-hidden mb-1">
                            <img src={recieve.re_pic} alt="" className="object-cover w-full h-full" />
                        </div>
                        {/* image zoom part  */}
                        {reP && (
                            <div
                                className="fixed inset-0 fles items-center justify-center bg-black/50"
                            >
                                {/* close button */}
                                <button
                                    className="absolute top-6 right-6 text-white text-3xl font-light z-50 cursor-pointer p-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setReP(false)
                                    }}
                                >
                                    X
                                </button>

                                {/* image zoom part */}
                                <div
                                    className="relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={recieve.re_pic}
                                        alt=""
                                        className="w-full h-auto object-contain px-90 py-40"
                                    />
                                </div>
                            </div>

                        )}
                        {/*input field 3*/}
                        {role ? "" : (
                            <>
                                <input type="file" id="C1" hidden onChange={HandelImage} name="re_pic" />

                                {/* Button */}
                                <div className="flex justify-center mt-2 mb-2">
                                    <label htmlFor="C1" className="flex items-center gap-2 border border-green-500 text-green-500 px-4 py-1.5 rounded-full hover:bg-green-50 text-sm">
                                        Change Pic
                                    </label>
                                </div>
                            </>
                        )}
                    </div>

                </div>
                {/* part 2 product details*/}

                <div className="flex flex-col self-start h-auto w-auto bg-white rounded-xl shadow-xl mt-8">
                    {/*detial part */}
                    <div className="pl-4 py-4 border-b border-gray-200 flex flex-row items-center gap-x-3">
                        <h1 className="font-semibold ">Details</h1>
                        <button
                            onClick={() => {
                                if (pop) {
                                    setPop(false)
                                }
                                else {
                                    setPop(true)
                                    EditButton(recieve)
                                }
                            }}
                            className="border rounded cursor-pointer bg-green-400 text-white hover:bg-blue-600 px-3 py-1 flex items-center gap-x-2"
                        >
                            <MdOutlineModeEditOutline /><p>{pop ? "Cancel" : "Edit"}</p>
                        </button>
                    </div>

                    {/*pop form code*/}
                    {pop && (
                        <div className="w-full p-6 space-y-6">
                            <h3 className="text-gray-600 font-medium mb-2">Update Order</h3>
                            <form className="space-y-6" onSubmit={HandelSubmit}>
                                <input onChange={handleInput} value={updateorder.or_nu} type="text" name='or_nu' placeholder="Order Number" className="block w-full max-w-md border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input onChange={handleInput} value={updateorder.product_id} name="product_id" type="text" placeholder="Order Code" className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-400" />
                                    <input onChange={handleInput} value={updateorder.country} name="country" type="text" placeholder="Market" className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-400" />
                                </div>
                                <input onChange={handleInput} value={updateorder.amz_re_li} name="amz_re_li" type="text" placeholder="AMZ Review Link" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-400" />

                                <select
                                    onChange={handleInput} value={updateorder.order_status} name="order_status"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none bg-white"
                                >
                                    {recieve.order_status === "Completed" ? (
                                        <option value="Completed">Completed</option>
                                    ) : recieve.order_status === 'Cancelled' ? (
                                        <option value="Cancelled">Cancelled</option>
                                    ) : (

                                        <>
                                            <option value="Ordered">Ordered</option>
                                            <option value="Reviewed">Reviewed</option>

                                            {role ? (
                                                <>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Review Submitted Pending Refund">Review Submitted Pending Refund</option>
                                                    <option value="Refunded">Refunded</option>
                                                    <option value="Pending">Refunded Pending Review</option>
                                                    <option value="Onhold">On Hold</option>
                                                    <option value="ReviewedDeleted">Reviewed Deleted</option>
                                                    <option value="Order Cancelled By PMM">Order Cancelled By PMM</option>
                                                    <option value="Completed">Completed</option>
                                                </>
                                            ) : ""}
                                            <option value="Cancelled">Cancelled</option>
                                        </>
                                    )}
                                </select>

                                <textarea onChange={handleInput} value={updateorder.remark} name="remark" placeholder="Remarks" rows="4" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"></textarea>
                                <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors">Update Now</button>
                            </form>
                        </div>

                    )}

                    {/*main infomation div*/}
                    {!pop && (
                        <div>
                            <div
                                className="flex flex-col p-4 ">
                                {/*first infomation part */}
                                <div
                                    ref={refData}
                                    className={`
                                        flex flex-col border relative
                                 ${text
                                            ? 'border-green-500 bg-black/20 text-white'
                                            : 'border-gray-300 bg-transparent'
                                        }
                                `}>

                                    {/*part 1 */}
                                    {/*sold and keyword*/}
                                    <div className="flex flex-row px-2 text-start">
                                        <div className="h-15 w-110">
                                            <div className="text-xl font-sm text-gray-500 ">Order Number :</div>
                                            <div className="h-10 pt-2 text-gray-500 font-light">{recieve.or_nu}</div>
                                        </div>
                                        <div className="h-25 w-110">
                                            <div className="text-xl font-sm text-gray-500 ">Customer Email :</div>
                                            <div className="h-10 pt-2 text-gray-500 font-light">{recieve.cus_em_ad}</div>
                                        </div>
                                    </div>
                                    <button
                                        className="absolute top-2 right-2"
                                        onMouseDown={handleMouseDowm}
                                        onMouseUp={handelMouseUp}
                                    >
                                        <MdOutlineContentCopy className="w-6 h-6" />
                                    </button>
                                </div>

                                {/*infromation part 2 */}
                                {/*market and category*/}
                                <div className="flex flex-row justify-between px-4">
                                    <div className="h-auto w-auto">
                                        <div className="text-xl font-sm text-gray-500 ">Product ID :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">{recieve.info?.id}</div>
                                    </div>
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">AMZ Review Link :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">{recieve.amz_re_li}</div>
                                    </div>
                                </div>

                                <div className="flex flex-row">
                                    {/*Market*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Market :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">{recieve.info?.country}</div>
                                    </div>
                                    {/*order status  :*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Order Status :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">{recieve.order_status}</div>
                                    </div>
                                </div>

                                <div className="flex flex-row">
                                    {/* order Date :*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Order Date :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">
                                            {new Date(recieve.date_time).toLocaleString()}
                                        </div>
                                    </div>

                                    {/*Review Date :*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Review Date :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">
                                            {recieve.Reviewed_data ?
                                                new Date(recieve.Reviewed_data).toLocaleString()
                                                : "-"}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row">
                                    {/*Refunded Data :*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Refunded Date :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">
                                            {recieve.Refunded_date ?
                                                new Date(recieve.Refunded_date).toLocaleString() : "-"}
                                        </div>
                                    </div>
                                    {/*infromation last part */}
                                    {/*Last Update :*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Last Update Date:</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">
                                            {recieve.last_update ?
                                                new Date(recieve.last_update).toLocaleString()
                                                : "-"}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row">
                                    {/*Seller ID :*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Seller ID:</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">{recieve?.user_ID}</div>
                                    </div>
                                    {/*Commision:*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Commission:</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">
                                            {recieve.info?.adver_commission}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row text-start">
                                    {/*Order Status :*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Order Status History :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">2345654</div>
                                    </div>
                                    {/*Commsiox :*/}
                                    <div className="h-25 w-full">
                                        <div className="text-xl font-sm text-gray-500 ">Commission History :</div>
                                        <div className=" h-10 pt-2 text-gray-500 font-light">98989043</div>
                                    </div>
                                </div>

                                {/*remark :*/}
                                <div className="h-25 w-full">
                                    <div className="text-xl font-sm text-gray-500 ">Remark :</div>
                                    <div className=" h-10 pt-2 text-gray-500 font-light">{recieve.remark}</div>
                                </div>

                            </div>

                        </div>
                    )}
                </div>
            </div >

        </div >

    )
}
export default Order_Details