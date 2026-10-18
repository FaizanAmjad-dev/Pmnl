// Login.jsx - Clean version (Sirf Login)
import logo from "../assets/Img/logo_pmnl.jpeg"
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { useState, useContext } from "react"
import { Navigate, redirect, useNavigate } from "react-router-dom"
import { AllData } from "../ContextAPI/UserContext"

function Login() {
    const token = localStorage.getItem('access-token')
    if (token) {
        return <Navigate to="/dashboard" replace />
    }

    const { setGlobalusername, setGlobaluserpic } = useContext(AllData)
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [userpassword, setUserpassword] = useState('')

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const recieverdata = await fetch('http://127.0.0.1:8000/parentapi/login/token/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: userpassword
            })
        })

        const storage = await recieverdata.json();
        if (recieverdata.status === 200) {
            localStorage.setItem('admin', storage.is_staff)
            localStorage.setItem('access-token', storage.access)
            localStorage.setItem('refresh-token', storage.refresh)
            localStorage.setItem('UserName', username)
            localStorage.setItem('user_type', storage.user_type)
            setGlobalusername(storage.username)
            toast.success("Login Successful!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 200);
        }
        else {
            toast.error("Invalid Username or Password");
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-white p-4">
            <ToastContainer position="top-left" autoClose={200} />

            <div className="w-full max-w-sm p-6 flex flex-col items-center">

                <div className="mb-8">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-32 h-auto object-contain"
                    />
                </div>

                <div className="w-full">
                    {/* Login Form */}
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">
                                Username / Email
                            </label>
                            <input
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder=""
                                required
                                className="w-full py-2 px-1 text-base focus:outline-none border-b border-gray-200 focus:border-green-500 bg-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
                            <input
                                name="userpassword"
                                value={userpassword}
                                onChange={(e) => setUserpassword(e.target.value)}
                                type="password"
                                placeholder=""
                                required
                                className="w-full py-2 px-1 text-base focus:outline-none border-b border-gray-200 focus:border-green-500 bg-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 py-3 text-lg font-semibold w-full rounded-full mt-6 cursor-pointer hover:bg-green-700 text-white"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login