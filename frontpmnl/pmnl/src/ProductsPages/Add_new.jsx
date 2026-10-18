import { useState, useEffect } from "react"

function Add_new() {
    const token = localStorage.getItem("access-token")
    const API_URL = 'http://127.0.0.1:8000/parentapi/api/'
    const [datareciever, setDatareciever] = useState([])
    // useEffect(() => {
    //     fetch(API_URL,{    
    //     })
    //         .then((res) => res.json())
    //         .then((sender) => setDatareciever(sender))
    // }, [])

    const [receiveandsende, setReceiveandsende] = useState({
        to_re: "",
        keyword: '',
        brand_name: '',
        amz_seller: '',
        country: '',
        chiness_seller: '',
        category: '',
        product_t: '',
        min_value: '',
        adver_commission: '',
        selle_limit: '',
        overall_salle_limit: '',
        product_price: '',
    })
    const [amazonimag, setAmazonimag] = useState(null)
    const [picture, setPicture] = useState(null)

    const handleInpute = (e) => {
        setReceiveandsende({ ...receiveandsende, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let emtyCarrybox = new FormData();
        Object.keys(receiveandsende).forEach((key) => {
            emtyCarrybox.append(key, receiveandsende[key])
        })
        if (amazonimag) {
            emtyCarrybox.append('amz_pic', amazonimag)
        }
        if (picture) {
            emtyCarrybox.append('picture', picture)
        }

        fetch(API_URL, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: emtyCarrybox
        })
            .then((res) => res.json())
            .then((newEntery) => {
                setDatareciever(datareciever => [...datareciever, newEntery])
                setReceiveandsende({
                    to_re: "",
                    keyword: '',
                    brand_name: '',
                    amz_seller: '',
                    country: '',
                    chiness_seller: '',
                    category: '',
                    product_t: '',
                    min_value: '',
                    adver_commission: '',
                    selle_limit: '',
                    overall_salle_limit: '',
                    product_price: '',
                })
                setAmazonimag(null);
                setPicture(null);
            })

    }



    return (
        <div className="bg-gray-200/80 p-2 min-h-screen px-8">
            <div className="w-full h-auto pt-7">
                <h1 className="font-semibold text-3xl text-gray-700"> Product</h1>
            </div>
            {/*main dev for creacting products*/}
            <div className="w-full bg-white shadow-xl mt-8">
                <div className="flex flex-col p-2">
                    {/*form */}
                    <form action="" onSubmit={handleSubmit} className="flex flex-row gap-x-10 ">

                        {/*div part one*/}
                        <div className="w-180 px-2 py-3 ">
                            {/*name div */}
                            <div className="flex fex-row gap-x-5 py-3 ">
                                <span><h1 className="font-semibold text-gray-500">Add New Product </h1></span>
                                <span><code className="font-semibold text-gray-500">(Seller ID is 446)</code></span>
                            </div>
                            {/*keyword div*/}
                            <div className="mb-6">
                                <input type="text"
                                    name="keyword"
                                    value={receiveandsende.keyword}
                                    onChange={handleInpute}
                                    className="p-2 w-103 border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Keywords..." />
                            </div>
                            {/*brand name /amz swller fiv*/}
                            <div className="flex flex-row w-full gap-x-2 mb-5">
                                <span>
                                    <input type="text"
                                        name="brand_name"
                                        value={receiveandsende.brand_name}
                                        onChange={handleInpute}
                                        className="p-2 w-103 border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Brand Name" />
                                </span>
                                <span>
                                    <input type="text"
                                        name="amz_seller"
                                        value={receiveandsende.amz_seller}
                                        onChange={handleInpute}
                                        className="p-2 w-68 border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="AMZ Seller" />
                                </span>
                            </div>
                            {/*brand name /amz swller fiv*/}
                            <div className="flex flex-row w-full gap-x-2 mb-5">
                                <span className="">
                                    <select
                                        name="country"
                                        value={receiveandsende.country}
                                        onChange={handleInpute}
                                        id="country" className="w-75 p-2 border outline-none rounded border-gray-400 text-gray-600">
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
                                </span>
                                <span>
                                    <input type="text"
                                        name="chiness_seller"
                                        value={receiveandsende.chiness_seller}
                                        onChange={handleInpute}
                                        className="p-2 w-96 border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Chinese Seller" />
                                </span>
                            </div>
                            {/* Caregoey / Product Type*/}
                            <div className="flex flex-row gap-x-2 ">
                                {/*Category*/}
                                <span>
                                    <span><h1 className="ml-3">Select Catregory</h1></span>
                                    <select
                                        name="category"
                                        value={receiveandsende.category}
                                        onChange={handleInpute}
                                        className="border w-86 p-2 rounded text-gray-600 border-gray-400 ">
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
                                </span>
                                {/*Select Product Type*/}
                                <span>
                                    <span><h1 className="ml-3">Select Product Type</h1></span>
                                    <select
                                        name="product_t"
                                        value={receiveandsende.product_t}
                                        onChange={handleInpute}
                                        className="border w-86 p-2 rounded text-gray-600 border-gray-400 ">
                                        <option value="" disabled>Select Type</option>
                                        <option value="Text Review">Text Review</option>
                                        <option value="Top Reviewer">Top Reviewer</option>
                                        <option value="no review">no review</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Rating">Rating</option>
                                        <option value="RAS">RAS</option>
                                        <option value="RAO">RAO</option>
                                        <option value="Seller Testing">Seller Testing</option>
                                        <option value="Pic Review">Pic Review</option>
                                        <option value="Vid Review">Vid Review</option>
                                    </select>
                                </span>
                            </div>
                            {/*name div*/}
                            <div className="flex flex-row w-full mt-3">
                                <div className=""><h1 className="ml-3">Select Category</h1></div>
                                <div className="ml-62"><h1>Picture</h1></div>
                            </div>
                            {/*Piture div*/}
                            <div className="flex flex-row gap-x-3 w-145">
                                {/*Amazon picture*/}
                                <div className=" rounded border border-gray-400 outline-none">
                                    <input type="file"
                                        onChange={(e) => setAmazonimag(e.target.files[0])}
                                        className="file:border file:bg-gray-100 file:border file:border-gray-700 file:px-4 py-2 px-2 w-85" />
                                </div>
                                {/*Select Product Type*/}
                                <div className=" border border-gray-400 outline-none rounded ">
                                    <input type="file"
                                        onChange={(e) => setPicture(e.target.files[0])}
                                        className="file:border file:bg-gray-100 file:border file:border-gray-700 file:px-4 py-2 px-2 w-85" />
                                </div>
                            </div>
                            {/*Number div */}
                            <div className="flex flex-row gap-x-2 mt-3">
                                {/*Minimum Value Should Be 700*/}
                                <div>
                                    <div className="mt-6">
                                        <input placeholder="Minimum Value Should Be 700" type="number"
                                            name="min_value"
                                            value={receiveandsende.min_value}
                                            onChange={handleInpute}
                                            className="w-87 border border-gray-400 outline-none rounded p-2 " />
                                    </div>
                                </div>
                                <div>
                                    {/*title*/}
                                    <div>
                                        <h1 className="ml-3">Adverzpro Commission</h1>
                                    </div>
                                    {/*Adcerzpro Commission*/}
                                    <div>
                                        <input type="number" placeholder="175"
                                            name="adver_commission"
                                            value={receiveandsende.adver_commission}
                                            onChange={handleInpute}
                                            className="w-86 border border-gray-400 outline-none rounded p-2 " />
                                    </div>
                                </div>
                            </div>

                            {/*textarea for review*/}
                            <div className="w-175 border border-gray-400 rounded-xl p-4 mt-3">
                                <p>1. Review need to be submitted after 7 days of shipment received</p>
                                <p>2. Must use keyword for product search</p>
                                <p>3. Buyer should be honest, scammer buyer is responsibility of agent</p>
                                <p>4. Don't search with Brand Name</p>
                                <p>5. A pm should provide buyer's verification in case a pmm asks for it in case of expensive products</p>
                            </div>

                        </div>



                        {/*div part 2*/}
                        <div className="w-174 ">
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
                                <span>
                                    <input type="number"
                                        name="selle_limit"
                                        value={receiveandsende.selle_limit}
                                        onChange={handleInpute}
                                        className="p-2 w-86 border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Salle limit per day" />
                                </span>
                                <span>
                                    <input type="number"
                                        name="overall_salle_limit"
                                        value={receiveandsende.overall_salle_limit}
                                        onChange={handleInpute}
                                        className="p-2 w-86 border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Overall Salle limit" />
                                </span>
                            </div>
                            {/*Today remaining*/}
                            <div className="mt-8">
                                <input type="number"
                                    name="to_re"
                                    value={receiveandsende.to_re}
                                    onChange={handleInpute}
                                    className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="today remaining" />
                            </div>
                            {/*product price*/}
                            <div className="mt-8">
                                <input type="number"
                                    name="product_price"
                                    value={receiveandsende.product_price}
                                    onChange={handleInpute}
                                    className="p-2 w-full border border border-gray-400 rounded outline-gray-400 text-gray-600" placeholder="Product Price" />
                            </div>
                            {/*buttion div*/}
                            <div className="mt-4">
                                <button className="border-2 rounded px-3 py-2 border-green-600 hover:bg-green-500 hover:text-white " type="submit">Add Now</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}
export default Add_new