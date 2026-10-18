import search from "../assets/Img/search_white.png"
import whatsapp from "../assets/Img/whatsapp_logo.jpeg"
import product from "../assets/Img/product_icon.jpg"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function AddNew() {
    const token = localStorage.getItem('access-token')

    const api = 'http://127.0.0.1:8000/parentapi/reservation/'
    const [receive, setReceive] = useState([])
    const [id, setID] = useState('')
    const FormData = async (e) => {
        e.preventDefault();
        const response = await fetch(api, {
            method: "POST",
            headers: ({
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({
                re_product: id
            })
        })
        if (response.ok) {
            alert("Add")
        }
        else {
            alert('1:already add    2:id not available')
        }
    }

    return (
        <div className="bg-gray-200/80 min-h-screen px-10 h-full">
            <div className="w-full h-auto pt-7">
                <h1 className="font-semibold text-3xl text-gray-700"> Reservation</h1>
            </div>
            {/*main div */}
            <div className=" mt-4">
                <form onSubmit={FormData} action="" className="border border-gray-300 bg-white w-full h-auto flex flex-row">
                    {/*first main div */}
                    <div className="w-200 h-50 flex flex-col py-6 px-4 gap-y-2 rounded">
                        {/*order activer*/}
                        <div>
                            <h1 className="text-gray-400 font-semibold">
                                Reserve An Order
                            </h1>
                        </div>
                        {/* order number*/}
                        <div>
                            <input value={id} onChange={(e) => setID(e.target.value)} type="text" placeholder="Product ID" className="w-100 px-2 py-2 border border-gray-300 rounded text-sm focus:border-white focus:outline-1 focus:outline-lime-600" />
                        </div>

                        {/*bttn*/}
                        <div>
                            <button type="submit" className="border cursor-pointer hover:text-white hover:bg-lime-600 border-lime-600 px-4 py-2 rounded text-sm text-lime-600 mt-5 ml-4 ">Reserve Now</button>
                        </div>
                    </div>

                    {/*second main div*/}
                    <div className="w-200 h-50">

                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddNew