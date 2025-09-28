import { Award, Headset, Package, Settings, Settings2, Trophy } from 'lucide-react'
import bg1 from '../../assets/image/Rectangle 1.png'
import CardShowLandingPage from '../Card/CardShowLandingPage'
import Footer from '../Landing/Footer'
import ShowReward from '../ShowReward'
import logo from '../../assets/image/loogonly.png'
import Navbar from '../Navbar/Navbar'
import { useProducts } from '../useProducts '
import { Link, useLocation, useNavigate, useSubmit } from 'react-router-dom'
import { useRef, useState } from 'react'



const ShopPage = () => {
    const products = useProducts();
    const location = useLocation();
    const productGridRef = useRef(null);

    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get("category");
    const searchTerm = params.get("search") || ""
    const IsShowHeart = Boolean(params.get("heart")) || false
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []


    let filteredProducts = products
    
    if (IsShowHeart) {
        filteredProducts = products.filter(p =>
            wishlist.some(item => item.id === p.id)  // แสดงเฉพาะที่อยู่ใน wishlist
        )
    }
    // กรองตาม category
    if (categoryFromQuery && categoryFromQuery !== "All") {
        filteredProducts = filteredProducts.filter(
            p => p.category === categoryFromQuery
        )
    }

    // กรองตาม searchTerm
    if (searchTerm.trim() !== "") {
        filteredProducts = filteredProducts.filter(
            p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.id.toString().includes(searchTerm) // ค้นหาจาก id ด้วย
        )
    }





    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);

    // slice ของสินค้าที่จะโชว์
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // จำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);

        setTimeout(() => {
            if (productGridRef.current) {
                const yOffset = -600; // ความสูง navbar
                const y = productGridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 50);
    };

    return (
        <div className="bg-white">
            {/* Shop */}
            <div className="bg-cover bg-center h-[316px]  flex justify-center items-center" style={{ backgroundImage: `url(${bg1})` }}>
                <div className="font-Poppins">
                    <div className="flex flex-col items-center -space-y-4">
                        <img src={logo} alt="" className="w-[77px] h-[77px]" />
                        <h1 className='font-medium text-[48px]'>Shop</h1>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-gray-500 text-[16px] font-Poppins font-medium">
                        <span className="cursor-pointer hover:text-black">Home</span>
                        <span>{'>'}</span>
                        <span className="text-black">Shop</span>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="h-[100px] bg-[#F9F1E7] flex justify-around">
                <div className="flex items-center gap-16  ">
                    <Link to={'/comparison'} >
                        <div className="flex items-center gap-2 font-Poppins text-[18px] ">

                            <Settings2 />Filter

                        </div>
                    </Link>
                    <h1 className='border-l-2 pl-10 border-[#9F9F9F] font-Poppins text-[16px]'>Showing 1–16 of 32 results</h1>

                </div>
                <div className="flex gap-4 items-center font-Poppins text-[20px]">
                    <h1 className='text-[18px]'>Show</h1>

                    <input
                        type="number"
                        min={1}
                        max={32}
                        value={itemsPerPage}
                        onChange={(e) => {
                            let value = parseInt(e.target.value) || 1;
                            if (value < 1) value = 1;
                            if (value > 32) value = 32;
                            setItemsPerPage(value);
                        }}
                        className="w-[55px] h-[55px] text-center text-[#9F9F9F] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

            </div>
            <div className="flex justify-center  mt-10 " ref={productGridRef} >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((Product) => (
                            <CardShowLandingPage
                                key={Product.id}
                                id={Product.id}
                                image={Product.imageUrl}
                                price={Product.discountPrice}
                                badge={Product.badge}
                                product={Product.name}
                                discount={Product.discountPercent}
                                detail={Product.description}
                            />
                        ))
                    ) : (
                        <div className="col-span-4 h-[400px] flex justify-center items-center text-gray-500">
                            Not found
                        </div>
                    )}
                </div>
            </div>
            <div className="w-auto h-[100px] flex justify-center items-center gap-4 mt-6">
                {[...Array(totalPages)].map((_, i) => (
                    <div
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-[60px] cursor-pointer flex justify-center items-center h-[60px] rounded-lg font-Poppins text-[20px] ${currentPage === i + 1 ? "bg-[#B88E2F] text-white" : "bg-[#F9F1E7] text-black"
                            }`}
                    >
                        {i + 1}
                    </div>
                ))}

                {currentPage < totalPages && (
                    <div
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-[98px] cursor-pointer flex justify-center items-center h-[60px] bg-[#F9F1E7] rounded-lg text-black font-Poppins text-[20px]"
                    >
                        Next
                    </div>
                )}
            </div>

            <ShowReward />
            <Footer />
        </div >
    )
}
export default ShopPage