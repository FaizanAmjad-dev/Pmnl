import dev from ".././assets/Img/profileimg.png";
import { RxCross2 } from "react-icons/rx";
import { data, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function TimerFunction({ onexpire, expireAt }) {
    const [timeleft, setTimeleft] = useState('')
    useEffect(() => {
        const CountDown = () => {
            const difference = +new Date(expireAt) - +new Date()
            if (difference <= 0) {
                setTimeleft("expire Time")
                if (onexpire) onexpire();
                return false
            }
            const hours = Math.floor((difference / (1000 * 60 * 60) % 24))
            const minute = Math.floor((difference / (1000 * 60) % 60))
            const second = Math.floor((difference / 1000) % 60)

            const timeFormate = `${hours.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`
            setTimeleft(timeFormate)
            return true;
        }

        const currenttimer = CountDown()

        if (currenttimer) {
            const InterverID = setInterval(() => {
                const lifeline = CountDown()
                if (!lifeline) {
                    return clearInterval(InterverID)
                }
            }, 1000);
            return () => clearInterval(InterverID)
        }
    }, [expireAt])
    return <span className="font-mono font-semibold text-red-600">{timeleft}</span>;

}


function Show() {
    const navigate = useNavigate()

    const token = localStorage.getItem('access-token')
    const role = localStorage.getItem('admin') == 'true';
    // ya api hai 
    const [datareciever, setDatareciever] = useState([])
    const [fakeareciever, setFakedatareciever] = useState([])
    const API_URL = "http://127.0.0.1:8000/parentapi/reservation/"

    useEffect(() => {
        fetch(API_URL, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then((res) => {
                if (res.status === 401) {
                    return []
                }
                return res.json()
            })
            .then((sender) => {
                setDatareciever(sender)
                setFakedatareciever(sender)
            })
    }, [])

    const Remove = (id) => {
        fetch(`${API_URL}${id}/`, {
            method: "DELETE",
            headers: ({
                "Authorization": `Bearer ${token}`,
            })
        })
            .then((res) => {
                if (res.ok) {
                    setDatareciever((prevData) => prevData.filter((item) => item.id !== id));
                    setFakedatareciever((prevData) => prevData.filter((item) => item.id !== id));
                    alert("Reservation removed successfully!");
                }
            })

    }

    const [productPerpage, setProductPerpage] = useState(7)
    const [pageNumber, setPageNumber] = useState(1)
    const indexOFlastproduct = pageNumber * productPerpage
    const indexOFfirstproduct = indexOFlastproduct - productPerpage
    const currentPage = fakeareciever.slice(indexOFfirstproduct, indexOFlastproduct)
    const counter = Math.ceil(fakeareciever.length / productPerpage)



    return (
        <div className="bg-gray-200/80 p-2 min-h-screen px-8">
            {/*title*/}
            <div className="w-full h-auto pt-7">
                <h1 className="font-semibold text-3xl text-gray-700"> Reserved Orders</h1>
            </div>

            {/*parent dev*/}
            <div className="flex flex-row mt-15 p-4 w-full border-2 border-gray-300 bg-white/80 rounded-b">
                {/*main parent dev*/}
                <div className="w-full border border-gray-200 shadow-xl rounded-xl bg-white overflow-hidden">
                    {/*title dev*/}
                    <div className="w-full p-6">
                        <h1 className="text-gray-700 text-xl font-semibold">Active Reservations </h1>
                    </div>
                    <hr className="w-full text-gray-300 " />

                    {/*main table*/}

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                {/* Width ki jagah px-6 aur py-4 apply kiya gaya hai */}
                                <th className="px-6 py-4 border-b border-gray-300 font-bold text-gray-700 text-left">#</th>
                                <th className="px-6 py-4 border-b border-gray-300 font-bold text-gray-700 text-left">User</th>
                                <th className="px-6 py-4 border-b border-gray-300 font-bold text-gray-700 text-left">Product ID</th>
                                <th className="px-6 py-4 border-b border-gray-300 font-bold text-gray-700 text-left">Remaining Time</th>
                                <th className="px-6 py-4 border-b border-gray-300 font-bold text-gray-700 text-center">Image</th>
                                <th className="px-6 py-4 border-b border-gray-300"></th>
                                <th className="px-6 py-4 border-b border-gray-300"></th>
                            </tr>
                        </thead>
                        {currentPage.map((list) => (
                            <tbody key={list.id}>
                                <tr className="text-center border-b border-gray-100">
                                    {/* td mein bhi width hata kar padding lagayi gayi hai */}
                                    <td className="px-6 py-4 text-left text-green-500">{list.id}</td>
                                    <td className="px-6 py-4 text-left text-green-500">{list?.user_name}</td>
                                    <td className="px-6 py-4 text-left">{list?.re_product_details?.id || ""}</td>
                                    <td className="px-6 py-4 text-left text-red-600 ">
                                        <TimerFunction
                                            expireAt={list.expire_at}
                                            onexpire={() => Remove(list.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex justify-center">
                                        <img src={list?.re_product_details?.amz_pic || ""} alt="profile" className="rounded-full object-cover w-10 h-10" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => { role ? alert("not reserved") : navigate(`/dashboard/order/order_Create/${list.re_product}`) }}
                                            type="submit" className="whitespace-nowrap cursor-pointer py-2 px-4 bg-green-700/90 hover:bg-green-600 text-white rounded shadow-sm">
                                            Create Order
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => Remove(list.id)} type="submit" className="whitespace-nowrap cursor-pointer py-2 px-4 bg-red-700/90 hover:bg-red-600 text-white rounded shadow-sm">
                                            <RxCross2 className="inline mr-2" /> Release
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>

                </div>
            </div>
            {datareciever.length >= 7 && (
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
    );
}

export default Show;