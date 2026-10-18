import All from "../assets/Img/img.png"

function Add_page() {
    return (
        <div className="flex flex-col bg-white h-200 rounded py-2 px-9 shadow-2xl border-b border-t border-gray-200 ">
            <div className="flex flex-col justify-center items-center border-red-700 border-t border-b shadow-xl  mt-7 rounded px-5 py-3 ">
                <div className="  ">
                     <img src={All} alt="" className="rounded border-l-gray-500 border-r-gray-500 overflow-hidden" />
                </div>
                 <div className="text-red-700 mt-5 text-xl font-bold ">
                    <h1> Place your Add</h1>
                 </div>
                 <div className="font-semibold text-center my-3">
                    <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Ipsum mollitia iure corrupti enim delectus, reprehenderit 
                        exercitationem dolorem reiciendis, </p>
                 </div>
                    <div>
                        <button className="bg-red-700 rounded p-2 text-white font-bold hover:bg-red-600 cursor-pointer transition-transform duration-300 hover:rotate-1   "> Click Here</button>
                    </div>
            </div>
        </div>
    )
}
export default Add_page