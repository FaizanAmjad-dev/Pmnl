import { useState, useContext, Children } from "react"
import { AllData } from "./UserContext"
import { Outlet } from "react-router-dom"

function ControlData({ children }) {
    const [globalusername, setGlobalusername] = useState(
        localStorage.getItem("UserName" )
    )
    const [globaluserpic, setGlobaluserpic] = useState(
        localStorage.getItem('User_pic')||""
    )
    const [sideClose,setSideClose]= useState(false)

    const [globalnot, setGlobalnot] = useState(0)
    
    const [globalissue, setGlobalissue] = useState(0)
    return (
        <AllData.Provider value={{sideClose,setSideClose,globalissue,setGlobalissue,globalnot,setGlobalnot, globaluserpic,setGlobaluserpic, globalusername, setGlobalusername }}>
            <main>
                {children}
            </main>
        </AllData.Provider>
    )
}
export default ControlData