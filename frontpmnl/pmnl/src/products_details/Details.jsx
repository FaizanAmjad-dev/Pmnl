import picture from "../assets/Img/pic.webp"
import { useState, useEffect } from "react"

function Details() {
    const [datareciever, setDatareciever] = useState([])
    const API_URL = 'http://127.0.0.1:8000/parentapi/api/'
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((sender) => setDatareciever(sender))
    }, [])



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
            {datareciever.filter((dat) => dat.id.toString() === id)
                .map((items, index) =>
                    <div key={index} className="flex flex-row gap-x-6 px-10">

                        {/* Product image detial */}
                        <div className="flex flex-col items-center w-130 h-auto bg-white rounded-t-xl shadow-xl mt-8 mb-4">
                            <div className="flex flex-col items-center w-full border-b border-b-gray-200 h-auto px-4">
                                {/*first image heading*/}
                                <div className="font-semibold text-xl text-center text-gray-700 mt-8 mb-2">Picture</div>

                                {/*image 1*/}
                                <div className="w-120 h-auto overflow-hidden mb-2">
                                    <img src={items.picture} alt="" className="content-cover w-full h-full" />
                                </div>

                            </div>

                            {/*second image heading  */}
                            <div className="font-semibold text-xl text-center text-gray-700 mt-8 mb-2">Amazon Picture</div>

                            {/*image 2*/}
                            <div className="w-120 h-auto overflow-hidden">
                                <img src={items.amz_pic} alt="" className="content-cover w-full h-full" />
                            </div>
                            {/*box dev empty div*/}
                            <div className="w-full h-10 border-t-gray-200 border-t mt-4 ">

                            </div>
                        </div>

                        {/* part 2 product details*/}
                        <div className="flex flex-col w-260 h-270 bg-white rounded-xl shadow-xl mt-8 mb-10">

                            {/*detial part */}
                            <div className="pl-4 py-4 border-b border-gray-200">
                                <h1 className="font-semibold ">Details</h1>
                            </div>

                            {/*main infomation div*/}
                            <div className="flex flex-col p-4 ">
                                {/*first infomation part */}
                                <div className="flex flex-col border p">

                                    {/*part 1 */}
                                    {/*sold and keyword*/}
                                    <div className="flex flex-row px-2">
                                        <div className="h-25 w-110">
                                            <div className="text-xl font-sm text-gray-500 ">Keyword :</div>
                                            <div className="ml-6 h-10 pt-2 text-gray-500 font-light">{items.keyword}</div>
                                        </div>
                                        <div className="h-25 w-110">
                                            <div className="text-xl font-sm text-gray-500 ">Sold By :</div>
                                            <div className="ml-6 h-10 pt-2 text-gray-500 font-light">{items.amz_seller}</div>
                                        </div>
                                    </div>

                                    {/*part 2*/}
                                    {/*id and name*/}
                                    <div className="flex flex-row px-4">
                                        <div className="h-25 w-110">
                                            <div className="text-xl font-sm text-gray-500 ">Brand Name :</div>
                                            <div className="ml-2 h-10 pt-2 text-gray-500 font-light">{items.brand_name}</div>
                                        </div>
                                        <div className="h-25 w-110">
                                            <div className="text-xl font-sm text-gray-500 ">Product ID :</div>
                                            <div className="ml-2 h-10 pt-2 text-gray-500 font-light">{items.min_value}</div>
                                        </div>
                                    </div>
                                </div>

                                {/*infromation part 2 */}
                                {/*market and category*/}
                                <div className="flex flex-row">
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Market :</div>
                                        <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{items.market}</div>
                                    </div>
                                    <div className="h-25 w-110">
                                        <div className="text-xl font-sm text-gray-500 ">Category :</div>
                                        <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{items.country}</div>
                                    </div>
                                </div>
                                {/*Commission*/}
                                <div className="h-25 w-full">
                                    <div className="text-xl font-sm text-gray-500 ">Commission :</div>
                                    <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{items.adver_commission}</div>
                                </div>
                                {/*Product Type :*/}
                                <div className="h-25 w-full">
                                    <div className="text-xl font-sm text-gray-500 ">Product Type :</div>
                                    <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{items.category}</div>
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
                                            <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{items.overall_salle_limit}</div>
                                        </div>
                                        <div className="h-25 w-110">
                                            <div className="text-xl font-sm text-gray-500 ">Daily Sale Limit:</div>
                                            <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{items.selle_limit}</div>
                                        </div>
                                    </div>
                                    {/*Product Price:*/}
                                    <div className="h-25 w-full ">
                                        <div className="text-xl font-sm text-gray-500 ">Product Price:</div>
                                        <div className="ml-4 h-10 pt-2 text-gray-500 font-light">{items.product_price}</div>
                                    </div>


                                </div>


                            </div>

                        </div>

                    </div>
                )}
        </div>

    )
}
export default Details