import { useNavigate } from "react-router-dom"
import search from "../assets/Img/search_white.png"
import { useContext, useEffect, useState } from "react"
import { AllData } from "../ContextAPI/UserContext"

function Alls() {
    const { globalissue, setGlobalissue } = useContext(AllData)
    const userType = localStorage.getItem("user_type")?.toLowerCase();
    const isAdmin = userType === "admin";

    const role = localStorage.getItem('admin') === 'true'
    const navigate = useNavigate()
    const token = localStorage.getItem('access-token')
    const [pop, setPop] = useState(false)
    const SupportAPI = 'http://127.0.0.1:8000/parentapi/support/'
    const [reciever, setReciever] = useState([])
    const [queryData, setQueryData] = useState([])
    useEffect(() => {
        fetch(SupportAPI, {
            headers: ({
                "Authorization": `Bearer ${token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setReciever(data)
                setQueryData(data)
                setGlobalissue(data.length)

            })
    }, [])

    const [createData, setCreateData] = useState({
        problem_status: "",
        subject: "",
        prob_details: "",
    })
    const HandleINput = (e) => {
        setCreateData({ ...createData, [e.target.name]: e.target.value })
    }
    const HandelSubmit = (e) => {
        e.preventDefault();
        const payLoad = ({
            problem_status: createData.problem_status,
            subject: createData.subject,
            prob_details: createData.prob_details,
        })
        fetch(SupportAPI, {
            method: "POST",
            headers: ({
                "Content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(payLoad)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setQueryData(prev => [...prev, data])
                setCreateData({
                    problem_status: "",
                    subject: "",
                    prob_details: "",
                })
            })

    }
    const [productPerpage, setProductPerpage] = useState(7)
    const [pageNumber, setPageNumber] = useState(1)
    const indexOFlastproduct = pageNumber * productPerpage
    const indexOFfirstproduct = indexOFlastproduct - productPerpage
    const currentPage = queryData.slice(indexOFfirstproduct, indexOFlastproduct)
    const counter = Math.ceil(queryData.length / productPerpage)

    // search by order id
    const [OrderID, setOrderID] = useState("")
    const OrderFilter = (e) => {
        e.preventDefault();
        const term = OrderID;
        setPageNumber(1)
        if (!term) {
            setQueryData(reciever)
        }
        else {
            const filt = reciever.filter((com) => com.ord_data.id.toString().includes(term))
            setQueryData(filt)
        }
    }
    // Issue id 
    const [issue, setIssue] = useState("")
    const IssueFilter = (e) => {
        e.preventDefault();
        const term = issue;
        setPageNumber(1)
        if (!term) {
            setQueryData(reciever)
        }
        else {
            const co = reciever.filter((data) => data.id.toString().includes(term))
            setQueryData(co)
        }
    }

    return (
        <div className="bg-gray-100/80 min-h-screen px-10 pt-10 h-full">
            {/*main div */}
            <div className="flex flex-col mt-8 p-4">
                {/* create support */}
                <div className="flex flex-col">
                    {/* button */}
                    {isAdmin ? (
                        <div >
                            <button
                                onClick={() => setPop(!pop)}
                                className="rounded font-xs text-white bg-green-600 px-2 py-2 ml-16 mb-5">Create New Issue</button>
                        </div>
                    ) : ""}
                    {/* support form */}
                    {pop &&
                        (<form
                            action=""
                            onSubmit={HandelSubmit}
                            className="flex flex-col gap-y-6 w-full mb-60 px-10">
                            {/* select issue */}
                            <select
                                onChange={HandleINput}
                                value={createData.problem_status}
                                name="problem_status"
                                className="border border-gray-300 py-2 px-2 w-full rounded bg-white outlin-none focus:outline-none ">
                                <option value="">Select Issue Type</option>
                                <option value="refund_delay">Refund Delay</option>
                                <option value="Product Availabilty">Product Availabilty</option>
                                <option value="commission_issue">Commission Issue</option>
                                <option value="product_returned_after_refund">Product Returned After Refund</option>
                                <option value="other_issue">Other Query</option>
                            </select>
                            {/* subject */}
                            <input
                                onChange={HandleINput}
                                value={createData.subject}
                                name="subject"
                                type="text"
                                className="border bg-white border-gray-300 py-2 px-2 w-full rounded outlin-none focus:outline-none " placeholder="Subject" />
                            {/* PM ID */}
                            <input
                                onChange={HandleINput}
                                value={createData.user}
                                name="user"
                                type="text"
                                className="border bg-white border-gray-300 py-2 px-2 w-full rounded outlin-none focus:outline-none " placeholder="PM ID" />
                            {/* Explain Issue */}
                            <textarea
                                onChange={HandleINput}
                                value={createData.prob_details}
                                name="prob_details"
                                id="" cols="30" rows="10" className="border bg-white border-gray-300 py-2 px-2 w-full rounded outlin-none focus:outline-none " placeholder="Type your message here ...">
                            </textarea>
                            {/* sender buttton  */}
                            <div>
                                <button
                                    type="submit"
                                    className="rounded font-xs text-white bg-green-600 px-4 py-2 ml-16 mb-5">
                                    Send
                                </button>
                            </div>
                        </form>
                        )}
                </div>

                {/*search bar div*/}
                <div className="w-full ">
                    <div className="space-y-6">
                        <div className="w-full rounded-b-xl shadow-xl">
                            <form
                                onSubmit={IssueFilter}
                                className=" flex flex-row bg-white rounded-b-xl shdow-xl">
                                <input
                                    value={issue}
                                    onChange={(e) => setIssue(e.target.value)}
                                    type="search" className="w-full bg-gray-100 border border-gray-500 py-4 h-13 px-2 mb-4" placeholder=" Search By Issue ID..." />
                                <button className="w-70 h-13 bg-blue-500 border-t border-b border-r object-cover overflow-hidden  " >
                                </button>
                            </form>
                        </div>
                        <div className="w-full rounded-b-xl shadow-xl ">
                            <form
                                onSubmit={OrderFilter}
                                className=" flex flex-row bg-white rounded-b-xl shdow-xl">
                                <input
                                    value={OrderID}
                                    onChange={(e) => setOrderID(e.target.value)}
                                    type="search" className="w-full bg-gray-100 border border-gray-500 py-4 h-13 px-2 mb-4" placeholder=" Search By Order ID..." />
                                <button className="w-70 h-13 bg-blue-500 border-t border-b border-r object-cover overflow-hidden  " >
                                </button>
                            </form>
                        </div>
                    </div>
                    {/*List */}
                    <div>
                        <table className="w-full border-2 border-green-600 shadow-xl mt-7">
                            <thead className="border-b-2 h-14 border-green-600 bg-gray-200">
                                <tr className="">
                                    <th className="w-10 "></th>
                                    <th className="w-30 font-bold text-gray-500 text-start">ID</th>
                                    <th className="w-30 font-bold text-gray-500 text-start">Subject</th>
                                    <th className="w-80 font-bold text-gray-500 text-start">Status</th>
                                    <th className="w-70 font-bold text-gray-500 text-start">Text Date</th>
                                    <th className="w-20 "></th>
                                </tr>
                            </thead>
                            {currentPage.map((list, index) => (
                                <tbody key={index} className="border-b-2 h-14 border-green-600 h-20">
                                    < tr className={`border-b border-gray-200 ${role ? (list.superuser_read || list.admin_read) ? "bg-white hover:bg-gray-50" : "bg-green-100/80 hover:bg-green-200/60 font-semibold" : list.client_read ? "bg-white hover:bg-gray-50" : "bg-green-100/80 hover:bg-green-200/60 font-semibold"}`}>
                                        <td className="w-10"></td>
                                        <td className="w-30 font-bold text-gray-500 text-start">{list.id}</td>
                                        <td className="w-30 font-bold text-gray-500 text-start">{list.subject}</td>
                                        <td className="w-80 font-bold text-gray-500 text-start">{list.ord_data ? (list.ord_data?.id) : ""}{list.problem_status}</td>
                                        <td className="w-70 font-bold text-gray-500 text-start">{new Date(list.Created_at).toLocaleString()}</td>
                                        <td className="w-20">
                                            <button
                                                onClick={() => navigate(`/dashboard/support/directreportpage/${list.id}`)}
                                                className="border p-2 bg-green-600 hover:bg-blue-600 text-white rounded">Read More</button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
                {queryData.length >= 7 && (
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
        </div>
    )
}
export default Alls