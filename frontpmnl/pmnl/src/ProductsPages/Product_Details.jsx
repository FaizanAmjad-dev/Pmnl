import { useEffect, useRef, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";

function Product_Details() {

    const token = localStorage.getItem('access-token')
    const role = localStorage.getItem('admin') === "true"
    const userType = localStorage.getItem("user_type")?.toLowerCase();
    const isAdmin = userType === "admin";
    const isSuperUser = userType === "superuser";
    const isClient = userType === "client";

    // yaha par id hai 
    const { id } = useParams()
    // ya api hai 
    const [datareciever, setDatareciever] = useState({})
    const API_URL = `http://127.0.0.1:8000/parentapi/details/${id}/`
    useEffect(() => {
        fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then((res) => {
                if (res.status === 401) {
                    return []
                }
                else {
                    return res.json()
                }
            })
            .then((sender) => setDatareciever(sender))
    }, [id, token])

    // edit or details ka leya  
    const [pop, setPop] = useState(false)

    // image ko handel karny ka leya 
    const handleImage = (e) => {
        const filename = e.target.name
        const fileUrl = e.target.files[0]
        if (!filename) return;
        let box = new FormData();
        box.append(filename, fileUrl)

        fetch(API_URL, {
            method: "PATCH",
            headers: ({
                'Authorization': `Bearer ${token}`
            }),
            body: box
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data) {
                    alert("Not Add")
                }
                return setDatareciever(data)
            })
    }

    // ya details ko update karny ka leya hai 
    const [list, setList] = useState({
        keyword: "",
        brand_name: "",
        amz_seller: "",
        country: "",
        chiness_seller: "",
        category: "",
        adver_commission: "",
        selle_limit: "",
        overall_salle_limit: "",
        product_price: "",
        to_re: "",
    })

    const handelValue = (list) => {
        setList({
            keyword: list.keyword,
            brand_name: list.brand_name,
            amz_seller: list.amz_seller,
            country: list.country,
            chiness_seller: list.chiness_seller,
            category: list.category,
            adver_commission: list.adver_commission,
            selle_limit: list.selle_limit,
            overall_salle_limit: list.overall_salle_limit,
            product_price: list.product_price,
            to_re: list.to_re,
        })
    }
    const HandleInput = (e) => {
        setList({ ...list, [e.target.name]: e.target.value })
    }
    const HandleSubmit = (e) => {
        e.preventDefault();
        let carry = new FormData();
        Object.keys(list).forEach((key) => {
            carry.append(key, list[key])
        })
        fetch(API_URL, {
            method: "PATCH",
            headers: ({
                "Authorization": `Bearer ${token}`
            }),
            body: carry
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data) {
                    alert("Something went wrong")
                }
                else {
                    setDatareciever(data)
                    alert("Success")
                    setList({
                        keyword: "",
                        brand_name: "",
                        amz_seller: "",
                        country: "",
                        chiness_seller: "",
                        category: "",
                        adver_commission: "",
                        selle_limit: "",
                        overall_salle_limit: "",
                        to_re: "",
                    })

                }
            })
    }

    const [handeimage1, setHandleimage1] = useState(false)
    const [handeimage2, setHandleimage2] = useState(false)

    const textRef = useRef()
    const [copied, setCopied] = useState(false)
    const handleMouseDowm = () => {
        if (textRef.current) {
            navigator.clipboard.writeText(textRef.current.innerText)
        }
        setCopied(true)
    }
    const handelMouseUp = () => {
        setCopied(false)
    }

    return (

        <div className="bg-gray-200/80 min-h-screen">
            <div>
                {/*name/heading*/}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"></div>
                <div className="w-full h-auto ml-8 pt-10">
                    <div><h1 className="font-sm text-gray-500">OVERVIEW</h1></div>
                    <div><h1 className="font-semibold text-3xl text-gray-700">Product Details</h1></div>
                </div>

            </div>

            {/*parent diev*/}

            <div className="flex flex-row gap-x-6 px-10">

                {/* Product image detial */}
                <div className="flex flex-col items-center w-full max-w-lg self-start bg-white rounded-xl shadow-xl mt-8 mb-4 overflow-hidden">

                    {/* Section 1*/}
                    <div className="flex flex-col items-center w-full border-b border-gray-200 px-6 py-6">
                        {/* image heading */}
                        <div className="font-semibold text-xl text-center text-gray-700 mb-4">Picture</div>
                        {/* Image 1 */}
                        <div
                            onClick={() => setHandleimage1(true)}
                            className="w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                            <img src={datareciever.picture} alt="User Picture" className="object-cover w-full h-full" />
                        </div>
                        {handeimage1 && (
                            <div
                                className="fixed inset-0 flex items-center justify-center bg-black/50"
                            >
                                {/* close button */}
                                <button
                                    className="absolute top-6 right-6 text-white text-3xl font-light z-50 cursor-pointer p-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setHandleimage1(false)
                                    }}
                                >
                                    X
                                </button>

                                {/* image zoom part */}
                                <div
                                    className="relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={datareciever.picture}
                                        alt=""
                                        className="w-full h-auto object-contain px-90 py-40"
                                    />
                                </div>
                            </div>

                        )}
                        {/* input field */}
                        {isAdmin ? (
                            <>
                                <input type="file" hidden onChange={handleImage} name="picture" id="a1" />
                                {/* Button*/}
                                <label htmlFor="a1" className="mt-4 px-4 py-2 outline-none border border-green-700 hover:bg-green-700 text-green-700 hover:text-white font-medium text-sm rounded-lg">
                                    Change Image
                                </label>
                            </>
                        ) : ""}
                    </div>

                    {/* Section 2*/}
                    <div className="flex flex-col items-center w-full px-6 py-6">
                        {/* image heading */}
                        <div className="font-semibold text-xl text-center text-gray-700 mb-4">Amazon Picture</div>
                        {/* Image 2 */}
                        <div
                            onClick={() => setHandleimage2(true)}
                            className="w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                            <img src={datareciever.amz_pic} alt="Amazon Picture" className="object-cover w-full h-full" />
                        </div>
                        {handeimage2 && (
                            <div
                                className="fixed inset-0 fles items-center justify-center bg-black/50"
                            >
                                {/* close button */}
                                <button
                                    className="absolute top-6 right-6 text-white text-3xl font-light z-50 cursor-pointer p-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setHandleimage2(false)
                                    }}
                                >
                                    X
                                </button>

                                {/* image zoom part */}
                                <div
                                    className="relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={datareciever.amz_pic}
                                        alt=""
                                        className="w-full h-auto object-contain px-90 py-40"
                                    />
                                </div>
                            </div>

                        )}
                        {/* input fields 2 */}
                        {isAdmin ? (
                            <>
                                <input type="file" hidden onChange={handleImage} accept="images/*" name="amz_pic" id="b1" />
                                {/* Button*/}
                                <label htmlFor="b1" className="mt-4 px-4 py-2 outline-none border border-green-700 hover:bg-green-700 text-green-700 hover:text-white font-medium text-sm rounded-lg ">
                                    Change Image
                                </label>
                            </>
                        ) : ""}
                    </div>

                    {/* Box dev empty div */}
                    <div className="w-full h-4 border-t border-gray-200 bg-gray-50"></div>
                </div>

                {/* part 2 product details*/}
                <div className="flex flex-col w-260 self-start bg-white rounded-xl shadow-xl mt-8 mb-10">
                    {/*detial part */}

                    <div className="pl-4 py-4 border-b border-gray-200 flex flex-row items-center gap-x-3">
                        <h1 className="font-semibold ">Details</h1>
                        {isAdmin ? (
                            <button
                                onClick={() => {
                                    if (pop) {
                                        setPop(false)
                                    }
                                    else {
                                        setPop(true)
                                        handelValue(datareciever)
                                    }
                                }}
                                className="border rounded cursor-pointer bg-green-400 text-white hover:bg-blue-600 px-3 py-1 flex items-center gap-x-2"
                            >
                                <MdOutlineModeEditOutline /><p>{pop ? "Cancel" : "Edit"}</p>
                            </button>
                        ) : ""}
                    </div>
                    {/*main infomation div*/}
                    {!pop && (
                        <div className="flex flex-col p-4 ">
                            {/*first infomation part */}
                            <div
                                ref={textRef}
                                className={`p-4 border relative
                                    ${copied ? 'border-green-500 bg-black/20 text-white'
                                        : 'border-gray-300 bg-transparent'
                                    }`}>

                                {/*part 1 */}
                                {/*sold and keyword*/}
                                <div className="flex flex-row px-2">
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Keyword :</div>
                                        <div className="ml-6 h-10 pt-2 text-gray-500 font-light">{datareciever.keyword}</div>
                                    </div>
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Sold By :</div>
                                        <div className="ml-6 h-10 pt-2 text-gray-500 font-light">{datareciever.amz_seller}</div>
                                    </div>
                                </div>

                                {/*part 2*/}
                                {/*id and name*/}
                                <div className="flex flex-row px-4">
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Brand Name :</div>
                                        <div className="ml-2 h-10 pt-2 text-gray-500 font-light">{datareciever.brand_name}</div>
                                    </div>
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Product ID :</div>
                                        <div className="ml-2 h-10 pt-2 text-gray-500 font-light">{datareciever.id}</div>
                                    </div>
                                </div>
                                <button
                                    className="absolute top-2 right-2"
                                    onMouseDown={handleMouseDowm}
                                    onMouseUp={handelMouseUp}
                                >
                                    <MdOutlineContentCopy className="w-6 h-6" />
                                </button>
                            </div>

                            {/*infromation part 2 */}
                            {/*market and category*/}
                            <div className="flex flex-row">
                                <div className="h-25 w-110">
                                    <div className="text-xl font-sm text-gray-500 ">Market :</div>
                                    <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.country}</div>
                                </div>
                                {isAdmin ? (
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Category :</div>
                                        <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.category}</div>
                                    </div>
                                ) : ""}
                            </div>
                            {/*Commission*/}
                            <div className="flex flex-row">
                                <div className="h-25 w-110">
                                    <div className="text-xl font-sm text-gray-500 ">Commission :</div>
                                    <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.adver_commission}</div>
                                </div>
                                {isAdmin ? (
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Chinese Seller :</div>
                                        <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.chiness_seller}</div>
                                    </div>
                                ) : ""}
                            </div>

                            {/*Product Type :*/}
                            <div className="flex flex-row">
                                <div className="h-25 w-110">
                                    <div className="text-xl font-sm text-gray-500 ">Product Type :</div>
                                    <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.product_t}</div>
                                </div>
                                {isAdmin ? (
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Seller Name :</div>
                                        <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.user_name}</div>
                                    </div>
                                ) : ""}
                            </div>


                            {/*paragraph part start*/}
                            <div className="flex flex-col">

                                {/*paragraph part 1*/}
                                <div className="flex flex-row">
                                    {/*title*/}
                                    <div className="h-25 w-50 ">
                                        <h1 className="text-xl font-sm text-gray-500 ">Instructions :</h1>
                                    </div>
                                    {/*paragraph*/}
                                    <div className="h-25 w-auto ">
                                        <p className="font-light ">
                                            1. Review need to be submitted after 7 days of shipment received
                                            2. Must use keyword for product search. <br />
                                            3. Buyer should be honest, scammer buyer is responsibility of agent.
                                            4. Don't search with Brand Name.
                                            5. A pm should provide buyer’s verification in case a pmm asks for it in case of expensive products
                                        </p>
                                    </div>
                                </div>

                                {/*paragraph part 2*/}
                                <div className="flex flex-row">
                                    {/*title*/}
                                    <div className="h-25 w-50 ">
                                        <h1 className="text-xl font-sm text-gray-500 ">Refund Condition :</h1>
                                    </div>
                                    {/*paragraph*/}
                                    <div className="h-25 w-auto ">
                                        <p className="font-light ">
                                            1. Refund will be processed on 5 star review live on amazon <br />
                                            2. product cost + pp fee (Refund time could be 96 to 120 hours)
                                        </p>
                                    </div>
                                </div>

                                {/*paragraph part 3*/}
                                <div className="flex flex-row">
                                    {/*title*/}
                                    <div className="h-25 w-60 ">
                                        <h1 className="text-xl font-sm text-gray-500 ">Commission Condition :</h1>
                                    </div>
                                    {/*paragraph*/}
                                    <div className="h-25 w-auto ">
                                        <p className="font-light ">
                                            1. Full Commission will be paid on mature leads
                                            2. Mature lead will be considered those <br /> order which are refunded against 5 star reviews.
                                            3. Not included deleted and feedback. <br />
                                            4. on deleted commission will be paid as per Adverzpro rule.
                                        </p>
                                    </div>
                                </div>
                                {/*infromation last part */}
                                {/*Overall Sale Limit and Daily Sale Limit:*/}
                                <div className="flex flex-row ">
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Overall Sale Limit</div>
                                        <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.overall_salle_limit}</div>
                                    </div>
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Daily Sale Limit:</div>
                                        <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.selle_limit}</div>
                                    </div>
                                </div>
                                {/*Product Price:*/}
                                <div className="h-25 w-full ">
                                    <div className="text-xl font-sm text-gray-500 ">Product Price:</div>
                                    <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{datareciever.product_price}</div>
                                </div>


                            </div>


                        </div>
                    )}
                    {/* infomation edit part  */}
                    {pop && (
                        <div className="flex flex-col p-6" >
                            {/* step 1 */}
                            <form action="" onSubmit={HandleSubmit} className="flex flex-col gap-x-10 ">
                                {/*name div */}
                                <h1 className="font-semibold text-gray-500 pb-4">Update Product </h1>

                                {/*keyword div*/}
                                <div className="flex flex-row w-full gap-x-2 mb-5">
                                    {/* keyword */}
                                    <input type="text"
                                        name="keyword"
                                        onChange={HandleInput}
                                        value={list.keyword}
                                        className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="keyword" />
                                    {/* seller ID */}
                                    <div
                                        name=""
                                        className="p-2 w-180 border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="AMZ Seller" >
                                        Seller ID
                                    </div>
                                </div>

                                {/*brand name /amz swller fiv*/}
                                <div className="flex flex-row w-full gap-x-2 mb-5">
                                    {/* brand name */}
                                    <input type="text"
                                        onChange={HandleInput}
                                        value={list.brand_name}
                                        name="brand_name"
                                        className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Brand Name" />
                                    {/* amzone seller */}
                                    <input type="text"
                                        onChange={HandleInput}
                                        value={list.amz_seller}
                                        name="amz_seller"
                                        className="p-2 w-180 border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="AMZ Seller" />
                                </div>

                                {/*Product Type /country*/}
                                <div className="flex flex-row w-full gap-x-2 mb-5 ">
                                    {/* market  */}
                                    <select
                                        onChange={HandleInput}
                                        value={list.country}
                                        name="country"
                                        id="country" className="w-full p-2 border outline-none rounded border-gray-400 text-gray-600">
                                        <option value="" disabled>Select Market</option>
                                        <option value="US">US</option>
                                        <option value="UK">UK</option>
                                        <option value="DE">DE</option>
                                        <option value="IT">IT</option>
                                        <option value="CA">CA</option>
                                        <option value="ES">ES</option>
                                        <option value="AUS">AUS</option>
                                        <option value="JAPAN">JAPAN</option>
                                        <option value="KSA">KSA</option>
                                        <option value="UAE">UAE</option>
                                        <option value="General">General</option>
                                        <option value="FR">FR</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Russia">Russia</option>
                                        <option value="Sweden">Sweden</option>
                                        <option value="Netherland">Netherland</option>
                                        <option value="US-High Commission">US-High Commission</option>
                                        <option value="Walmart-US">Walmart-US</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Kindle Books">Kindle Books</option>
                                        <option value="ETSY">ETSY</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="India">India</option>
                                        <option value="Kindle US">Kindle US</option>
                                        <option value="eBay US">eBay US</option>
                                        <option value="Wlamart-CA">Wlamart-CA</option>
                                        <option value="Ali Express">Ali Express</option>
                                        <option value="Temu-US">Temu-US</option>
                                        <option value="Otto-DE">Otto-DE</option>
                                        <option value="Googl Reviews UK">Googl Reviews UK</option>
                                        <option value="Taobao">Taobao</option>
                                        <option value="TikTok UK">TikTok UK</option>
                                        <option value="Wayfair UK">Wayfair UK</option>
                                        <option value="Wayfair US">Wayfair US</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="TikTOk DE">TikTOk DE</option>
                                    </select>
                                    {/*Category*/}
                                    <select
                                        onChange={HandleInput}
                                        value={list.category}
                                        name="category"
                                        className="border w-full p-2 rounded text-gray-600 border-gray-400 ">
                                        <option value="" disabled>Select Category</option>
                                        <option value="Baby Products">Baby Products</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Expensive">Expensive Products</option>
                                        <option value="General">General</option>
                                        <option value="Health & Beauty">Health & Beauty</option>
                                        <option value="Gaming Product">Gaming Product</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Mobile Accessories">Mobile Accessories</option>
                                        <option value="Pet Related">Pet Related</option>
                                        <option value="Home & Kitchen">Home & Kitchen</option>
                                    </select>
                                </div>

                                {/* chines seller / commission*/}
                                <div className="flex flex-row gap-x-2 ">

                                    {/* chiness seller */}
                                    <input type="text"
                                        onChange={HandleInput}
                                        value={list.chiness_seller}
                                        name="chiness_seller"
                                        className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Chinese Seller" />

                                    {/*Adcerzpro Commission*/}
                                    <input type="number" placeholder="175"
                                        name="adver_commission"
                                        onChange={HandleInput}
                                        value={list.adver_commission}
                                        className="w-full border border-gray-400 outline-none rounded p-2 " />
                                </div>

                                {/*textarea for review*/}
                                <div className="w-full border border-gray-400 rounded-xl p-2 mt-3">
                                    <p>1. Review need to be submitted after 7 days of shipment received</p>
                                    <p>2. Must use keyword for product search</p>
                                    <p>3. Buyer should be honest, scammer buyer is responsibility of agent</p>
                                    <p>4. Don't search with Brand Name</p>
                                    <p>5. A pm should provide buyer's verification in case a pmm asks for it in case of expensive products</p>
                                </div>

                                {/*text area*/}
                                <div className="w-full border border-gray-400 rounded-xl p-4 mt-3">
                                    <p> 1. Refund will be processed on 5 star review live on amazon</p>
                                    <p>2. product cost + pp fee (Refund time could be 96 to 120 hours)</p>

                                </div>
                                {/*text area 2*/}
                                <div className="w-full border border-gray-400 rounded-xl p-4 mt-3">
                                    <p>  1. Full Commission will be paid on mature leads</p>
                                    <p> 2. Mature lead will be considered those order which are refunded against 5 star reviews.</p>
                                    <p>3. Not included deleted and feedback.</p>
                                    <p>4. on deleted commission will be paid as per Adverzpro rule.</p>
                                </div>

                                {/*Sale Limi Per day / Overall sale limit*/}
                                <div className="flex flex-row w-full gap-x-2 mt-4">
                                    {/* salle limits */}
                                    <input type="number"
                                        name="selle_limit"
                                        onChange={HandleInput}
                                        value={list.selle_limit}
                                        className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Salle limit per day" />
                                    {/* overall salle limit s */}
                                    <input type="number"
                                        name="overall_salle_limit"
                                        onChange={HandleInput}
                                        value={list.overall_salle_limit}
                                        className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Overall Salle limit" />
                                </div>

                                {/*product price*/}
                                <div className="mt-8">
                                    <input type="number"
                                        name="product_price"
                                        onChange={HandleInput}
                                        value={list.product_price}
                                        className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Product Price" />
                                </div>
                                <div className="mt-8">
                                    <input type="number"
                                        name="to_re"
                                        value={list.to_re}
                                        onChange={HandleInput}
                                        className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Product Price" />
                                </div>

                                {/*buttion div*/}
                                <div className="mt-4">
                                    <button className="border-2 rounded px-3 py-2 border-green-600 hover:bg-green-500 hover:text-white " type="submit">Add Now</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

            </div>

        </div>

    )
}
export default Product_Details