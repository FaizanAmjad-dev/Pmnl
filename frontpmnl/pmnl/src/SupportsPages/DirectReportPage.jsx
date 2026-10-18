import { useEffect, useState } from "react"
import { data, useNavigate, useParams } from "react-router-dom"
import { FiPaperclip } from "react-icons/fi";
import { AllData } from "../ContextAPI/UserContext";

function DirectReportPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const role = localStorage.getItem('admin') === 'true'

  const token = localStorage.getItem('access-token')
  const [pop, setPop] = useState(false)
  const [reciever, setReciever] = useState("")
  const [msgData, setMsgData] = useState([])
  const api = `http://127.0.0.1:8000/parentapi/support/${id}/`
  const GetData = () => {
    fetch(api, {
      headers: ({
        "Authorization": `Bearer ${token}`
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setReciever(data)
      }
      )
  }

  const Getmessage = () => {
    const Api = `http://127.0.0.1:8000/parentapi/message/?id=${id}`
    fetch(Api, {
      headers: ({
        "Authorization": `Bearer ${token}`
      })
    })
      .then((res) => res.json())
      .then((data) => setMsgData(data))
  }

  useEffect(() => {
    GetData()
    Getmessage()
  }, [id, token])

  const MessageApi = 'http://127.0.0.1:8000/parentapi/message/'
  const [file, setFile] = useState(null)
  const [longText, setLongText] = useState('')
  const PostData = (e) => {
    e.preventDefault();
    if (!longText.trim() && !file) return

    let carry = new FormData();
    if (longText.trim()) {
      carry.append('prob_details', longText)
    }
    carry.append('support', id)
    if (file) {
      carry.append("support_image", file)
    }
    fetch(MessageApi, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: carry
    })
      .then((res) => res.json())
      .then((data) => {
        setFile(null)
        setLongText("")
        setPop(false)
        setMsgData((msg) => [...msg, data])
      })

  }


  const Delete = () => {
    fetch(api, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            navigate("/dashboard/support/alls");
          }, 1000);
          setGlobalissue((prev) => prev > 0 ? prev - 1 : 0)
        }
      })
  }


  return (
    <div className="min-h-screen px-12 py-10 bg-gray-300/10 w-full">
      <div className="p-12 mx-auto w-full">

        {/* Top Header Section */}
        {role ? (
          <div className="flex justify-between items-center mb-8 pb-4 pl-10">
            <h1 className="text-6xl text-gray-600">direct report</h1>
            <button
              onClick={() => Delete(reciever)}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm">
              Issue Resolved
            </button>
          </div>
        ) : ""}
        {/* Main Conversation Container */}
        <div className="space-y-6 w-full">

          {/* Message 1 */}

          <div className="border-b border-gray-200 flex flex-col sapce-y-6 pb-6">
            <p className="text-xs text-gray-400 mb-4">
              By
              <span className="text-green-600 font-xl">
                {reciever.user_name}
              </span>
              on
              <span>
                {new Date(reciever.Created_at).toLocaleString()}
              </span>
            </p>
            <p className="text-base text-gray-800 flex flex-row gap-x-3">
              <span>{reciever.problem_status} </span>
              <span>{reciever.id} </span>
            </p>
          </div>

          <div className="space-y-4 mt-4">
            {msgData.map((msg, index) => (
              <div key={index} className="border-b border-gray-200 flex flex-col space-y-3 pb-4 pl-6">
                <p className="text-xs text-gray-400">
                  By <span className="text-blue-600 font-medium">{msg.user_name}</span> on {new Date(msg.created_at).toLocaleString()}
                </p>

                {/* Reply ka text */}
                <p className="text-sm text-gray-700">
                  {msg.prob_details}
                </p>

                {/* Reply image  */}
                {msg.support_image && (
                  <div className="w-60 h-auto rounded overflow-hidden">
                    <img src={msg.support_image} alt="reply-attachment" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form action="" onSubmit={PostData}>
          <div>
            {pop && (
              <textarea
                onChange={(e) => setLongText(e.target.value)}
                value={longText}
                name="prob_details"
                placeholder="Type your message here..."
                rows="6"
                className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-sm text-gray-700 outline-none transition-all duration-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-gray-400"
              ></textarea>
            )}
            {/* Bottom Reply Button */}
            <div className="flex justify-end itmes-center gap-x-2 mt-12">
              <div>
                <label htmlFor="pic"> <FiPaperclip className="size-6 mt-2" /></label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  name="support_image"
                  type="file" accept="image/*" hidden id="pic" />
              </div>

              <button
                type="submit"
                onClick={() => setPop(true)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {pop ? "Reply" : " Post "}
              </button>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
}

export default DirectReportPage;