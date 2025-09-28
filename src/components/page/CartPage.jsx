import Navbar from "../Navbar/Navbar"
import bg1 from '../../assets/image/Rectangle 1.png'
import ShowReward from "../ShowReward"
import Footer from "../Landing/Footer"
import logo from '../../assets/image/loogonly.png'
import { useState } from "react"
import { Link } from "react-router-dom"




const Cart = () => {
  const [productlist, setProductlist] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  const totalPrice = productlist.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * item.quantity;
  }, 0);
  return (
    <div>
      {/* Hero */}
      <div className="bg-cover bg-center h-[316px]  flex justify-center items-center" style={{ backgroundImage: `url(${bg1})` }}>
        <div className="font-Poppins">
          <div className="flex flex-col items-center -space-y-4">
            <img src={logo} alt="" className="w-[77px] h-[77px]" />
            <h1 className='font-medium text-[48px]'>Cart</h1>
          </div>
          <div className="flex items-center gap-2 justify-center text-gray-500 text-[16px] font-Poppins font-medium">
            <span className="cursor-pointer hover:text-black">Home</span>
            <span>{'>'}</span>
            <span className="text-black">Cart</span>
          </div>
        </div>
      </div>
      {/* main */}
      <div className="h-[525px] flex justify-around items-center ">
        {/* order */}
        <div className="h-[390px] w-[870px] overflow-auto">
          <table className="w-[850px]">
            <thead className="h-[55px]  ">
              <tr className="bg-[#F9F1E7] text-center align-middle  sticky top-0 ">
                <th>{" "}</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Size</th>
                <th>{" "}</th>
              </tr>
            </thead>
            <tbody className=" before:content-[''] before:block before:mt-10  ">
              {productlist.map((p) => (
                <tr className="text-center align-middle  pb-6">
                  <td className="pb-6"><img src={p.img} alt="" className="w-[108px] h-[108px] bg-[#F9F1E7] mx-auto rounded-lg" /></td>
                  <td className="pb-6">{p.name}</td>
                  <td className="pb-6">{p.discountPrice || p.price}</td>
                  <td className="text-center align-middle pb-6">
                    <input type="number" value={p.quantity}
                      className="w-[32px] h-[32px] border rounded-lg flex justify-center items-center mx-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center"
                      min={1}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 1; // กันเป็น NaN
                        const updatedCart = productlist.map((item) =>
                          item.id === p.id ? { ...item, quantity: newQuantity } : item
                        );
                        setProductlist(updatedCart);
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                      }}
                    />
                  </td>
                  <td className="pb-6"> {p.discountPrice * p.quantity}</td>
                  <td className="pb-6">{p.size}</td>
                  <td className="pb-6 px-4" onClick={() => {
                    const newCart = productlist.filter(cartItem => cartItem.id !== p.id); // ลบ item ตาม id
                    setProductlist(newCart)
                    localStorage.setItem("cart", JSON.stringify(newCart)); // อัปเดต localStorage
                  }}>🗑</td>
                </tr>
              ))}



            </tbody>
          </table>
        </div>
        {/* Cart Totals */}
        <div className="w-[393px] h-[390px] bg-[#F9F1E7] font-Poppins font-semibold flex flex-col justify-around items-center">
          <h1 className="text-[32px]">Cart Totals</h1>
          <div className="font-Poppins flex flex-col gap-[31px]">
            <div className="flex gap-[62px] font-medium text-[16px]">
              <p className="">Subtotal</p>
              <p className="text-[#9F9F9F]">{totalPrice} TH</p>
            </div>
            <div className="flex gap-[58px] font-medium ">
              <p className="text-[16px]">Total</p>
              <p className="text-[#B88E2F] text-[20px]">{productlist.length > 0 ? totalPrice + 1000 : 0}TH</p>
            </div>
            <Link to={'/checkout'}><button className="w-[222px] font-medium h-[58.95px] text-[20px] border-[#000000] border rounded-lg">Check Out</button></Link>
          </div>
        </div>
      </div>
      <ShowReward />
      <Footer />
    </div>
  )
}
export default Cart