import { useState } from "react"
import img from "../../assets/Img/profileimg.png"

function Change_password() {
    const token = localStorage.getItem('access-token')

    const api = 'http://127.0.0.1:8000/parentapi/upDate/'
    const [old_password, setOld_password] = useState('')
    const [new_password, setNew_password] = useState('')
    const [re_password, setRe_password] = useState('')

    const handlePassword = (e) => {
        e.preventDefault();
        if (new_password !== re_password) {
            window.alert('new password and repeat password wrong')
            return;
        }
        const payload = {
            'old_password': old_password,
            'new_password': new_password,
        }
        fetch((api), {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)

        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data) {
                    window.alert('success')
                }
                else {
                    window.alert('somthing Wrong')
                }
            })



    }


    return (
        <div className="bg-gray-200/80 p-2 min-h-screen px-8">
            <div className="w-full h-auto  pt-7">
                <h1 className="font-semibold text-3xl text-gray-700"> Change Password</h1>
            </div>
            {/*parent div*/}
            <div className="flex flex-row space-x-2 w-full border-2 border-gray-300 bg-white shadow rounded mt-6 p-3">
                {/*Update Passoword*/}
                <div className="rounded w-full h-130 p-3">
                    {/*tilte*/}
                    <div className="mb-3">
                        <h1 className="font-semibold text-gray-700 ">Update Passowrd</h1>
                    </div>
                    {/*paragraph*/}
                    <div>
                        <p className="text-gray-400 "> Your password must be more than 6 characters long,
                            should contain at-least 1 Uppercase, 1
                            Lowercase, 1 Numeric and 1 special character.</p>
                    </div>
                    {/*form */}
                    <form action="" onSubmit={handlePassword}>
                        <div>
                            {/*old /new / agian password*/}
                            <div className="w-full mt-8">
                                <input
                                    onChange={(e) => setOld_password(e.target.value)}
                                    value={old_password}
                                    type="password" placeholder="Old Password" className="border border-gray-300 mt-2 w-full p-2 rounded" />
                            </div>
                            <div className="w-full mt-4">
                                <input 
                                onChange={(e) => setNew_password(e.target.value)}
                                value={new_password}
                                type="password" placeholder="New Password" className="border border-gray-300 mt-2 w-full p-2 rounded" />
                            </div>
                            <div className="w-full mt-4">
                                <input 
                                onChange={(e) => setRe_password(e.target.value)}
                                value={re_password}
                                type="password" placeholder="Type Again New Password" className="border border-gray-300 mt-2 w-full p-2 rounded" />
                            </div>
                        </div>
                        {/*UPdate Now*/}
                        <div className="mt-31 ml-2">
                            <button type="submit" className="border bg-white text-green-600 px-4 py-2 rounded hover:bg-green-700 hover:text-white "> Update Now</button>
                        </div>
                    </form>

                </div>

                {/*image*/}
                <div className="rounded w-full h-130 p-3 ">
                    <div>
                        <img src={img} alt="" className="w-40 h-40 rounded-full overflow-hidden shadow " />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Change_password