import { Outlet, Link } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import { useEffect, useState } from "react"
import { X, ShoppingCart } from "lucide-react"

export default function Layout() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [productlist, setProductlist] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [isSearch, setIsSearch] = useState(false)

    const totalPrice = productlist.reduce((sum, item) => {
        const price = item.discountPrice || item.price;
        return sum + price * item.quantity;
    }, 0);


    useEffect(() => {
        const handleCartUpdate = (e) => setProductlist(e.detail || [])
        window.addEventListener("cartUpdate", handleCartUpdate)
        return () => window.removeEventListener("cartUpdate", handleCartUpdate)
    }, [])
    return (
        <>
            <div className="relative">
                <Navbar onclose={() => setIsCartOpen(true)} OpenisSearch={() => setIsSearch(true)} oncloseSearch={() => setIsSearch(false)} isSearch={isSearch} />




                {/* Outlet for page content */}

                {isCartOpen && <div className="fixed inset-0  bg-black/60 z-40 " />}

                {isCartOpen && <div className="bg-white right-0 w-[417px] absolute top-0 h-[746px] z-50 p-6" >
                    {/* shop */}
                    <div className="font-Poppins flex justify-between   ">
                        <h1 className="font-semibold text-[24px] w-[287px] border-b border-[#D9D9D9] pb-[26px]">Shopping Cart</h1>
                        <X onClick={() => setIsCartOpen(false)} className="cursor-pointer" />
                    </div>

                    {/* product shop */}
                    <div className=" w-auto h-[440px] mt-10 overflow-auto flex flex-col gap-[20px]">
                        {productlist && productlist.length > 0 ? (
                            productlist.map((item) => (
                                <div key={item.id} className="flex justify-between items-center ">
                                    <img src={item.img} alt="" className="bg-orange-200 w-[111px] h-[90px] border-0 rounded-lg" />
                                    <div className="font-Poppins">
                                        <h1>{item.name}</h1>
                                        <p className="text-[#B88E2F]">{item.quantity} x {item.discountPrice || item.price} TH</p>
                                    </div>
                                    <X
                                        onClick={() => {
                                            const newCart = productlist.filter(cartItem => cartItem.id !== item.id); // ลบ item ตาม id
                                            setProductlist(newCart)
                                            localStorage.setItem("cart", JSON.stringify(newCart)); // อัปเดต localStorage
                                            window.dispatchEvent(new CustomEvent("cartUpdate", { detail: newCart }));

                                        }}
                                        className="w-[20px] h-[20px] bg-[#9F9F9F] rounded-full text-white" />
                                </div>
                            ))
                        ) : (
                            <div>
                                Not product in cart
                            </div>
                        )}

                    </div>

                    {/* pay */}
                    {productlist && <div className="font-Poppins flex justify-between mt-10 pb-[23px] border-b border-[#D9D9D9] ">
                        <h1>Subtotal</h1>
                        <p className="text-[#B88E2F] font-semibold text-[16px] mr-10 ">{totalPrice} TH </p>
                    </div>}

                    {productlist && <div className="flex justify-between mt-[23px]">
                        <Link to={'/cart'} onClick={() => setIsCartOpen(false)}><button className="w-[87px] h-[30px] border rounded-full cursor-pointer">Cart</button></Link>
                        <Link to={'/checkout'} onClick={() => setIsCartOpen(false)}><button className="w-[118px] h-[30px] border rounded-full cursor-pointer">Checkout</button></Link>
                        <Link to={'/comparison'} onClick={() => setIsCartOpen(false)}><button className="w-[135px] h-[30px] border rounded-full cursor-pointer">Comparison</button></Link>
                    </div>}

                </div>}
                <Outlet />
            </div>
        </>
    )
}
