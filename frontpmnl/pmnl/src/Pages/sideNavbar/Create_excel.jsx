import img from "../../assets/Img/profileimg.png"
import { useState, useEffect, useRef } from "react"
import { CSVLink } from "react-csv"

function Create_excel() {
    const CSVref = useRef()
    const token = localStorage.getItem('access-token')
    const [orignalData, setOrignalData] = useState([])
    const [fakeData, setFakeData] = useState([])
    const api = 'http://127.0.0.1:8000/parentapi/submit/'
    useEffect(() => {
        fetch(api, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setOrignalData(data);
                setFakeData(data);
            })
    }, [])

    // date search range filter 
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filter, setFilter] = useState('')
    const range = (e) => {
        e.preventDefault();
        const start = new Date(startDate);
        const end = new Date(endDate);

        end.setHours(23, 59, 59, 999);

        const AllinONE = orignalData.filter((backendData) => {
            const save = new Date(backendData.date_time)
            const collectDate = save >= start && save <= end

            const checkStatus = filter === "" || backendData.product_t === filter
            return checkStatus && collectDate
        })
        setFakeData(AllinONE)
        setTimeout(() => {
            CSVref.current.link.click();
        }, 500);
    }

    return (
        <div className="bg-gray-200/80 p-2 min-h-screen px-8">
            <div className="w-full h-auto  pt-7">
                <h1 className="font-semibold text-3xl text-gray-700">Create Excel</h1>
            </div>
            {/*parent div*/}
            <div className="flex flex-row space-x-2 w-full border border-gray-300 bg-white shadow mt-6 p-3">

                <div className="rounded w-full h-70 p-3 ">
                    {/*form */}
                    <form onSubmit={range} action="" className="flex flex-col">
                        <div className="flex flex-row mb-2">
                            {/*title*/}
                            <div>
                                <h1 className="text-gray-400 font-semibold">From</h1>
                            </div>
                            <div>
                                <h1 className="text-gray-400 font-semibold ml-93">To</h1>
                            </div>
                        </div>
                        {/*Date inpute*/}
                        <div className="flex flex-row gap-x-2">
                            <div>
                                <input required value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" name="date_time" id="" className="border focus:border-green-400 outline-none text-sm w-96 p-2 rounded border-gray-300 text-gray-500" />
                            </div>
                            <div>
                                <input required value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" name="date_time" id="" className="border focus:border-green-400 outline-none w-75 text-sm p-2 rounded border-gray-300 text-gray-500" />
                            </div>
                        </div>
                        <div>
                            <select name="product_t" onChange={(e) => setFilter(e.target.value)} id="" className=" ml-4 mt-10 border focus:border-green-400 p-2 text-sm rounded border-gray-300 text-gray-500 outline-none box-shadow w-169">
                                <option value="">Select Order Status</option>
                                <option value="Ordered">Ordered</option>
                                <option value="Review Submitted">Review Submitted</option>
                                <option value="">Pending Refund</option>
                                <option value="">On Hold</option>
                                <option value="">Refunded Pending Review</option>
                                <option value="">Review Submitted Pending Refund</option>
                                <option value="">On Hold</option>
                                <option value="">Order Cancelled By Pmm</option>
                                <option value="">Cancelled</option>
                                <option value="">Completed</option>

                            </select>
                        </div>
                        {/*Buttion*/}
                        <button onClick={range} className="max-w-md border border-green-600 text-green-600 hover:text-white outline-none py-2 px-4 text-sm hover:bg-green-600 rounded mt-10 ml-4">
                            Generate
                        </button>
                        <CSVLink ref={CSVref} data={fakeData} filename={`report${startDate}To${endDate}.csv`}>
                        </CSVLink>
                    </form>

                </div>

                {/*image*/}
                <div className="rounded w-full h-70 p-3 ">
                    <div>
                        <img src={img} alt="" className="w-40 h-40 rounded-full overflow-hidden shadow " />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Create_excel