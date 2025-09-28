import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/image/Logo.png'
import header1 from '../../assets/image/header1.png'
import header2 from '../../assets/image/header2.png'
import header3 from '../../assets/image/header3.png'
import header4 from '../../assets/image/header4.png'
import { useEffect, useState } from 'react'

const Navbar = ({ onclose, OpenisSearch, isSearch, oncloseSearch }) => {
    const [productlist, setProductlist] = useState(() => JSON.parse(localStorage.getItem("cart")) || [])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const handleCartUpdate = (e) => {
            setProductlist(e.detail || [])
        }

        window.addEventListener("cartUpdate", handleCartUpdate)
        return () => window.removeEventListener("cartUpdate", handleCartUpdate)
    }, [])

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`)
            oncloseSearch()
            setSearchTerm('')
        }
    }
    const handleShowHeart = () => {

        navigate(`/shop?heart=true`)


    }

    return (
        <>
            <div className="h-[100px] bg-white flex items-center justify-between px-10 shadow-md">
                {/* Logo */}
                <Link to={'/'}>
                    <img src={Logo} alt="Logo" className="w-[185px] h-[41px]" />
                </Link>

                {/* Menu */}
                <ul className="flex gap-16 font-Poppins font-medium text-[16px]">
                    <Link to={'/'}><li className="cursor-pointer hover:text-[#B88E2F]">Home</li></Link>
                    <Link to={'/shop'}><li className="cursor-pointer hover:text-[#B88E2F]">Shop</li></Link>
                    <Link to={'/'}><li className="cursor-pointer hover:text-[#B88E2F]">About</li></Link>
                    <Link to={'/contact'}><li className="cursor-pointer hover:text-[#B88E2F]">Contact</li></Link>
                </ul>

                {/* Icons */}
                <ul className="flex gap-8 items-center">
                    <Link to={'/contact'}><img src={header1} alt="icon1" className="w-8 h-8 cursor-pointer hover:scale-110 transition" /></Link>
                    <img src={header2} alt="icon2" className="w-8 h-8 cursor-pointer hover:scale-110 transition" onClick={OpenisSearch} />
                    <img src={header3} alt="icon3" className="w-8 h-8 cursor-pointer hover:scale-110 transition " onClick={handleShowHeart} />
                    <div className="relative hover:scale-110 transition">
                        <img
                            src={header4}
                            onClick={onclose}
                            alt="icon4"
                            className="w-8 h-8 cursor-pointer"
                        />
                        {productlist.length > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 font-Poppins font-semibold bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                                {productlist.length}
                            </div>
                        )}
                    </div>
                </ul>
            </div>

            {/* Search Overlay */}
            {isSearch && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 z-20"
                        onClick={oncloseSearch}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-lg w-[400px]">
                        <input
                            type="text"
                            placeholder="Search product... "
                            className="flex-1 bg-transparent outline-none text-black text-[16px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch()
                                }
                            }}
                        />
                        <img
                            src={header2}
                            alt="close"
                            className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition"
                            onClick={handleSearch}
                        />
                    </div>
                </>
            )}
        </>
    )
}
export default Navbar
