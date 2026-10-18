import search from "../assets/Img/search_white.png"
import whatsapp from "../assets/Img/whatsapp_logo.jpeg"
import product from "../assets/Img/product_icon.jpg"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

function Order_Create() {
        const [close, setClose] = useState(false)

        const token = localStorage.getItem("access-token")
        const { id } = useParams()

        const API = "http://127.0.0.1:8000/parentapi/submit/"
        const [old, setOld] = useState([])
        // const [product, setProduct] = ({})
        const [order, setOrder] = useState({
                or_nu: "",
                cus_em_ad: "",
                amz_re_li: "",
                order_status: "Ordered",
        })
        const [image1, setImage1] = useState(null)
        const [image2, setImage2] = useState(null)
        const handleInput = (e) => {
                setOrder({ ...order, [e.target.name]: e.target.value })
        }
        const handleSubmit = (e) => {
                e.preventDefault();

                let carry = new FormData();
                Object.keys(order).forEach((key) => {
                        carry.append(key, order[key])
                })
                // parent ko add kary ka tarika 
                // foriegn key ka sab sy bara fyda ya hai ky hum is ko sirf id sa hi access kar sakty hai 
                carry.append("product", id)

                if (image1) {
                        carry.append("or_pic", image1)
                }
                if (image2) {
                        carry.append("re_pic", image2)
                }

                fetch(API, {
                        method: "POST",
                        headers: {
                                "Authorization": `Bearer ${token}`
                        },
                        body: carry
                })
                        .then((res) => res.json())
                        .then((data) => {
                                if (data) {
                                        console.log(data)
                                        window.alert("success")
                                }
                                setOld((prev) => [...prev, data])
                                setOrder({
                                        or_nu: "",
                                        cus_em_ad: "",
                                        amz_re_li: "",
                                        order_status: "",

                                })
                                setImage1(null)
                                setImage2(null)
                        })
        }
        if (!handleInput) {
                alert('error')
        }

        return (
                <div className="bg-gray-200/80 min-h-screen px-10 h-full">
                        <div className="w-full h-auto pt-7">
                                <h1 className="font-semibold text-3xl text-gray-700"> Orders</h1>
                        </div>
                        {/*main div */}
                        <div className=" mt-4">
                                <form onSubmit={handleSubmit}
                                        action="" className="border border-gray-300 bg-white w-full h-auto flex flex-row">
                                        {/*first main div */}
                                        <div className="w-200 h-120 flex flex-col py-6 px-4 gap-y-4 rounded">
                                                {/*order activer*/}
                                                <div>
                                                        <h1 className="text-gray-400 font-semibold">
                                                                Add New Order
                                                        </h1>
                                                </div>
                                                {/* order number*/}
                                                <div>
                                                        <input
                                                                onChange={handleInput}
                                                                name="or_nu"
                                                                value={order.or_nu}
                                                                type="text" placeholder="Order Number" className="w-100 px-2 py-2 border border-gray-300 rounded text-sm focus:border-white focus:outline-1 focus:outline-lime-600" />
                                                </div>
                                                {/*Customer email address*/}
                                                <div>
                                                        <input
                                                                name="cus_em_ad"
                                                                value={order.cus_em_ad}
                                                                onChange={handleInput}
                                                                type="text" placeholder="Customer email address" className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:border-white focus:outline-1 focus:outline-lime-600" />
                                                </div>
                                                {/*order pic*/}
                                                <div className="flex flex-col">
                                                        {/*order pic name*/}
                                                        <h1 className="text-gray-600 font-semibold">Order Pic</h1>
                                                        <div>
                                                                <input
                                                                        onChange={(e) => setImage1(e.target.files[0])}
                                                                        type="file" className="w-full file:border file:border-gray-400 file:rounded file:bg-gray-200 file:text-sm file:px-2 file:py-1 px-2 py-1 border border-gray-300 rounded text-sm outline-none" />
                                                        </div>
                                                </div>
                                                {/*Refund Pic*/}
                                                <div className="flex flex-col">
                                                        {/*Refund Pic name*/}
                                                        <h1 className="text-gray-600 font-semibold">Refund Pic</h1>
                                                        <div>
                                                                <input
                                                                        onChange={(e) => setImage2(e.target.files[0])}
                                                                        type="file" className="w-full file:border file:border-gray-400 file:rounded file:bg-gray-200 file:text-sm file:px-2 file:py-1 px-2 py-1 border border-gray-300 rounded text-sm outline-none" />
                                                        </div>
                                                </div>
                                                {/*AMZ Review Link*/}
                                                <div>
                                                        <input
                                                                name="amz_re_li"
                                                                value={order.amz_re_li}
                                                                onChange={handleInput}
                                                                type="text" placeholder="AMZ Review Link" className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:border-white focus:outline-1 focus:outline-lime-600" />
                                                </div>
                                                {/*status Ordered*/}
                                                <div>
                                                        <input
                                                                hidden
                                                                name="order_status"
                                                                value={order.order_status}
                                                                onChange={handleInput}

                                                                type="text" placeholder="AMZ Review Link" className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:border-white focus:outline-1 focus:outline-lime-600" />
                                                </div>
                                                {/*bttn*/}
                                                <div>
                                                        <button type="submit" className="border border-lime-600 px-4 py-2 rounded text-sm text-lime-600 mt-5 ml-4 ">Add Now</button>
                                                </div>
                                        </div>

                                        {/*second main div*/}
                                        <div className="w-200 h-120">

                                        </div>
                                </form>
                        </div>
                </div>
        )
}
export default Order_Create