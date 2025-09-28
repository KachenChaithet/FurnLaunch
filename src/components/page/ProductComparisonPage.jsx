import Navbar from "../Navbar/Navbar"
import bg1 from '../../assets/image/Rectangle 1.png'
import logo from '../../assets/image/loogonly.png'
import ShowReward from "../ShowReward"
import Footer from "../Landing/Footer"
import { useProducts } from "../useProducts "
import { Star, StarHalf, StarOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"


const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Toys & Games',
    'Health & Beauty',
    'Food & Beverages',
    'Automotive',
    'Pet Supplies',
    'Office Supplies',
    'Jewelry & Accessories',
    'Art & Crafts',
    'Music & Instruments',
    'Baby & Kids',
    'All'
];


const ProductComparisonPage = () => {

    const products = useProducts();

    const rating = products.rating || 4.5; // ถ้าไม่มี rating ใช้ค่า default
    const totalReviews = products.reviews || 145;


    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        navigate(`/shop?category=${encodeURIComponent(category)}`);
    }
    return (
        <>

            {/* Hero */}
            <div className="bg-cover bg-center h-[316px]  flex justify-center items-center" style={{ backgroundImage: `url(${bg1})` }}>
                <div className="font-Poppins">
                    <div className="flex flex-col items-center -space-y-4">
                        <img src={logo} alt="" className="w-[77px] h-[77px]" />
                        <h1 className='font-medium text-[48px]'>Product Comparison</h1>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-gray-500 text-[16px] font-Poppins font-medium">
                        <span className="cursor-pointer hover:text-black">Home</span>
                        <span>{'>'}</span>
                        <span className="text-black">Comparison</span>
                    </div>
                </div>
            </div>

            {/* main */}
            <div className="h-[860px]  p-10 flex flex-col justify-center ">
                {/* frist */}
                <div className="flex justify-around  pr-[20%] pb-[64px] border-b border-[#E8E8E8] ">
                    <div className="font-Poppins flex flex-col gap-[21px]">
                        <h1 className="w-[223px] font-medium text-[28px]" >Go to Product page for more
                            Products</h1>
                        <p className="underline font-medium text-[20px] text-[#727272]">View More</p>
                    </div>
                    <div className="">
                        {products && products.length > 0 ? (
                            (() => {
                                const randomIndex = Math.floor(Math.random() * products.length);
                                const product = products[randomIndex];
                                return (
                                    <>
                                        <Link to={`/detailproduct/${product.id}`}>
                                            <img src={product.imageUrl} alt="" className="w-[280px] h-[177px] rounded-lg" />
                                            <div className="font-Poppins font-medium">
                                                <h1 className="text-[24px]">{product.name || "Asgaard Sofa"}</h1>
                                                <p className="text-[18px]">{product.price || "Rs. 250,000.00"}</p>
                                                <p className="text-[18px] flex gap-2 items-center">
                                                    {rating}
                                                    {Array.from({ length: 5 }).map((_, i) => {
                                                        if (i + 1 <= rating) {
                                                            return <Star key={i} className="w-4 h-4 text-[#FFC700]" />;
                                                        } else if (i + 0.5 === rating) {
                                                            return <StarHalf key={i} className="w-4 h-4 text-[#FFC700]" />;
                                                        } else {
                                                            return <StarOff key={i} className="w-4 h-4 text-gray-300" />;
                                                        }
                                                    })}
                                                    <span className="border-l pl-[8px] font-normal text-[13px] text-[#9F9F9F]">{totalReviews} Review</span>
                                                </p>
                                            </div>
                                        </Link>
                                    </>
                                );
                            })()
                        ) : (
                            <p>Loading product...</p>
                        )}
                    </div>
                    <div className="">
                        {products && products.length > 0 ? (
                            (() => {
                                const randomIndex = Math.floor(Math.random() * products.length);
                                const product = products[randomIndex];
                                return (
                                    <>
                                        <Link to={`/detailproduct/${product.id}`}>
                                            <img src={product.imageUrl} alt="" className="w-[280px] h-[177px] rounded-lg" />
                                            <div className="font-Poppins font-medium">
                                                <h1 className="text-[24px]">{product.name || "Asgaard Sofa"}</h1>
                                                <p className="text-[18px]">{product.discountPrice || product.price}</p>
                                                <p className="text-[18px] flex gap-2 items-center">
                                                    {rating}
                                                    {Array.from({ length: 5 }).map((_, i) => {
                                                        if (i + 1 <= rating) {
                                                            return <Star key={i} className="w-4 h-4 text-[#FFC700]" />;
                                                        } else if (i + 0.5 === rating) {
                                                            return <StarHalf key={i} className="w-4 h-4 text-[#FFC700]" />;
                                                        } else {
                                                            return <StarOff key={i} className="w-4 h-4 text-gray-300" />;
                                                        }
                                                    })}
                                                    <span className="border-l pl-[8px] font-normal text-[13px] text-[#9F9F9F]">{totalReviews} Review</span>
                                                </p>
                                            </div>
                                        </Link>
                                    </>
                                );
                            })()
                        ) : (
                            <p>Loading product...</p>
                        )}
                    </div>



                </div>

                {/* second  */}
                <div className="font-Poppins  pr-[20%]  md:pl-[4%]   ">
                    <div className=" flex flex-col justify-around  gap-[28px]">
                        <h1 className="font-medium text-[28px]">category</h1>
                        <div className="font-Poppins grid grid-cols-3 gap-[34px]">
                            {categories.map((c) => (
                                <h1 onClick={() => handleCategoryClick(c)} className="hover:underline hover:text-neutral-500 text-[20px] cursor-pointer">{c}</h1>

                            ))}
                        </div>
                    </div>

                </div>



            </div>


            {/* ShowReward */}
            <ShowReward />
            {/* Footer */}
            <Footer />

        </>
    )
}
export default ProductComparisonPage