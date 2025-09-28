const Footer = () => {
    return (
        <div className="w-auto h-[505px] border-t  border-[#D9D9D9]  ">
            <div className="flex justify-around items-start mt-14 border-b  border-[#D9D9D9] pb-14 w-[90%] mx-auto ">
                <div className="font-Poppins flex flex-col gap-12">
                    <h1 className="text-[20px] font-bold">Funiro.</h1>
                    <div className="font-Poppins text-[16px] text-[#9F9F9F] w-[300px]">
                        <p>400 University Drive Suite 200 Coral Gables,
                        </p>
                        <p>FL 33134 USA</p>
                    </div>
                    <p></p>
                </div>
                <ul className="flex flex-col font-Poppins font-medium text-[16px] gap-9">
                    <li className="text-[#9F9F9F] mb-4">Links</li>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <ul className="flex flex-col font-Poppins font-medium text-[16px] gap-9">
                    <li className="text-[#9F9F9F] mb-4">Help</li>
                    <li>Payment Options</li>
                    <li>Returns</li>
                    <li>Privacy Policies</li>
                </ul>
                <ul className="flex flex-col font-Poppins font-medium text-[16px] gap-10">
                    <li className="text-[#9F9F9F] mb-4">Newsletter</li>
                    <li className="flex gap-4">
                        <input type="text" className="border-b w-60 outline-0" placeholder="Enter Your Email Address" />
                        <button className="border-b">SUBSCRIBE</button>
                    </li>

                </ul>
            </div>
            <div className="text-[18px] font-Poppins flex justify-start pl-20 items-center h-30">
                2025 furino. All rights reverved copy landing page from learning
            </div>
        </div>
    )
}
export default Footer