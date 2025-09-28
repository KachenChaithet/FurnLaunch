import { FaHeart } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CardShowLandingPage = ({ id, product, detail, price, discount, badge, image }) => {
    const [isHover, setIsHover] = useState(false)
    const [isHeart, setIsHeart] = useState(false)
    const navigate = useNavigate()

    // อ่าน wishlist จาก localStorage
    const getWishlist = () => JSON.parse(localStorage.getItem("wishlist")) || []
    const saveWishlist = (wishlist) => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
        window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: wishlist }))
    }

    useEffect(() => {
        const wishlist = getWishlist()
        setIsHeart(wishlist.some(item => item.id === id))

        const handleUpdate = (e) => {
            setIsHeart(e.detail.some(item => item.id === id))
        }
        window.addEventListener("wishlistUpdate", handleUpdate)
        return () => window.removeEventListener("wishlistUpdate", handleUpdate)
    }, [id])

    const addToCart = (e) => {
        e.stopPropagation()
        const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || []
        const existingIndex = cartFromStorage.findIndex(item => item.id === id)

        let newCart
        if (existingIndex >= 0) {
            cartFromStorage[existingIndex].quantity += 1
            newCart = [...cartFromStorage]
        } else {
            const item = { id, img: image, name: product, price, quantity: 1, discountPrice: price, size: 'L', color: "Purple" }
            newCart = [...cartFromStorage, item]
        }

        localStorage.setItem("cart", JSON.stringify(newCart))
        window.dispatchEvent(new CustomEvent("cartUpdate", { detail: newCart }))
        alert("เพิ่มลงตะกร้าแล้ว!")
    }

    const toggleHeart = (e) => {
        e.stopPropagation()
        let wishlist = getWishlist()

        if (isHeart) {
            wishlist = wishlist.filter(item => item.id !== id)
        } else {
            wishlist.push({ id, product, price, image })
        }

        saveWishlist(wishlist)
        setIsHeart(!isHeart)
    }
    const getBadgeStyle = (badge) => {
        switch (badge) {
            case 'New':
                return { backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #A7F3D0' };
            case 'Hot':
                return { backgroundColor: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5' };
            case 'Sale':
                return { backgroundColor: '#FEF9C3', color: '#78350F', border: '1px solid #FCD34D' };
            case 'Featured':
                return { backgroundColor: '#EDE9FE', color: '#5B21B6', border: '1px solid #C4B5FD' };
            case 'Limited':
                return { backgroundColor: '#FFEDD5', color: '#C2410C', border: '1px solid #FDBA74' };
            case 'Bestseller':
                return { backgroundColor: '#DBEAFE', color: '#1E40AF', border: '1px solid #93C5FD' };
            case 'Premium':
                return { backgroundColor: '#FCD34D', color: '#374151', border: '1px solid #D1D5DB' };
            default:
                return { backgroundColor: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB' };
        }
    };


    return (
        <div
            className="w-[285px] h-[446px] bg-[#F4F5F7] relative overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => navigate(`/detailproduct/${id}`)}
        >
            <img src={image} alt={product} className='w-[285px] h-[301px]' />
            <div className="flex flex-col p-2 gap-2 font-Poppins">
                <h1 className='font-semibold text-[24px]'>{product}</h1>
                <p className='text-[#898989] font-medium text-[16px]'>{detail}</p>
                <h1 className='font-semibold text-[20px]'>{price} TH</h1>
            </div>

            {discount && (
                <div className='w-[48px] h-[48px] bg-[#E97171] rounded-full flex justify-center items-center absolute top-6 right-6'>
                    <h1 className='font-Poppins font-medium text-white text-[16px]'>-{discount}%</h1>
                </div>
            )}
            {discount && badge && (
                <>
                    <div className='w-[48px] h-[48px] bg-[#E97171] rounded-full flex justify-center items-center absolute top-6 right-6'>
                        <h1 className='font-Poppins font-medium text-white text-[16px]'>-{discount}%</h1>
                    </div>
                    <div className='w-[auto] h-[48px] p-2  rounded-full flex justify-center items-center absolute top-20 right-6'
                        style={getBadgeStyle(badge)}
                    >
                        <h1 className='font-Poppins font-medium  text-[16px]'>{badge}</h1>
                    </div>
                </>
            )}

            {badge && !discount && (
                <div className='w-[auto] p-2 h-[48px]  rounded-full flex justify-center items-center absolute top-6 right-6'
                    style={getBadgeStyle(badge)}
                >
                    <h1 className='font-Poppins font-medium  text-[16px]'>{badge}</h1>
                </div>
            )}

            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-[#3A3A3A]/80 flex  items-center justify-center gap-4 transition-opacity duration-300 ${isHover ? "opacity-100" : "opacity-0"}`}>
                <button
                    onClick={addToCart}
                    className="bg-white font-semibold text-[#B88E2F] px-4 py-2 rounded-lg font-Poppins w-[202px] h-[48px] cursor-pointer hover:scale-105 transition"
                >
                    Add To Cart
                </button>
                <button onClick={toggleHeart} className='text-3xl'>
                    <FaHeart className={`${isHeart ? 'text-red-600' : 'text-gray-300'} hover:text-red-700 hover:scale-110 transition`} />
                </button>
            </div>
        </div>
    )
}

export default CardShowLandingPage
