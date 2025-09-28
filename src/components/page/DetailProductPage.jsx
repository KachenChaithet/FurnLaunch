import { Link, useActionData, useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import { Facebook, FacebookIcon, Handbag, Instagram, LucideFacebook, Star, StarHalf, StarOff, Twitch, X } from "lucide-react"
import CardShowLandingPage from "../Card/CardShowLandingPage"
import RelatedProducts from "../RelatedProducts"
import Footer from "../Landing/Footer"
import { useEffect, useState } from "react"
import { useProductsPrice } from "../useProducts "



const DetailProductPage = () => {
    const { id } = useParams();
    const product = useProductsPrice(id)
    const [productlist, setProductlist] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);


    // Cart
    const [productCount, setProductCount] = useState(1)
    const [selectedSize, setSelectedSize] = useState('L')
    const [selectedColor, setSelectedColor] = useState('Purple')



    const addToCart = () => {
        const item = {
            id: product.id,
            img: product.imageUrl,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            size: selectedSize,
            color: selectedColor,
            quantity: productCount,
        };

        const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];

        const existingIndex = cartFromStorage.findIndex(
            cartItem =>
                cartItem.id === item.id &&
                cartItem.size === item.size &&
                cartItem.color === item.color
        );

        let newCart;
        if (existingIndex >= 0) {
            cartFromStorage[existingIndex].quantity += item.quantity;
            newCart = [...cartFromStorage];
        } else {
            newCart = [...cartFromStorage, item];
        }

        setProductlist(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));

        // dispatch custom event ให้ Navbar หรือ component อื่นรับรู้
        window.dispatchEvent(new CustomEvent("cartUpdate", { detail: newCart }));

        alert("เพิ่มลงตะกร้าแล้ว!");
    };


    const handleCleanSelected = () => {
        setProductCount(1)
        setSelectedSize('L')
        setSelectedColor('Purple')
    }

    useEffect(() => {
        handleCleanSelected()
    }, [id])


    return (
        <div className="w-full  h-auto relative">



            {/* Navbar */}
            <div className="h-[100px] bg-[#F9F1E7] flex items-center ">
                <nav className="flex items-center gap-2 text-gray-500 text-[16px] font-Poppins font-medium container mx-auto px-6">
                    <h1 to="/" className="cursor-pointer hover:text-black">Home</h1>
                    <span>{'>'}</span>
                    <h1 className="cursor-pointer hover:text-black">Shop</h1>
                    <span>{'>'}</span>
                    <span className="text-black border-l-2 pl-4 border-[#9F9F9F]">
                        {product?.name}
                    </span>
                </nav>
            </div>
            <div className="flex justify-around mt-10 border-[#D9D9D9] border-b-1 pb-18">
                <div className="flex flex-col gap-8">
                    <img src={product.imageUrl} alt="" className="w-[76px] h-[80px] bg-[#F9F1E7] rounded-lg border-none " />
                    <img src={product.imageUrl} alt="" className="w-[76px] h-[80px] bg-[#F9F1E7] rounded-lg border-none" />
                    <img src={product.imageUrl} alt="" className="w-[76px] h-[80px] bg-[#F9F1E7] rounded-lg border-none" />
                    <img src={product.imageUrl} alt="" className="w-[76px] h-[80px] bg-[#F9F1E7] rounded-lg border-none" />
                </div>
                <div className="bg-[#F9F1E7] w-[423px] h-[500px] rounded-lg ">
                    <img src={product?.imageUrl} alt="img" className="w-full h-full object-cover rounded-lg" />
                </div>

                {/* seletet */}
                <div className="font-Poppins flex flex-col gap-3 ">
                    <h1 className="text-[42px]">{product?.name}</h1>
                    <h2 className="text-[24px] text-[#9F9F9F] font-medium">{product?.discountPrice || product?.price} TH</h2>
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                            if (i + 1 <= 4.5) {
                                return <Star key={i} className="w-6 h-6 text-[#FFC700]" />;
                            } else if (i + 0.5 === 4.5) {
                                return <StarHalf key={i} className="w-6 h-6 text-[#FFC700]" />;
                            } else {
                                return <StarOff key={i} className="w-6 h-6 text-gray-300" />;
                            }
                        })}
                    </div>
                    <p className="w-[510px]">{product?.description}
                    </p>
                    <div className="font-Poppins">
                        <p className="text-[14px] text-[#9F9F9F]">Size</p>
                        <div className="flex gap-4">
                            <button className={`w-[30px] h-[30px] ${selectedSize === "L" ? 'bg-[#B88E2F] text-white' : 'bg-[#F9F1E7] text-black'} rounded-lg`} onClick={() => setSelectedSize('L')}>L</button>
                            <button className={`w-[30px] h-[30px] ${selectedSize === "XL" ? 'bg-[#B88E2F] text-white' : 'bg-[#F9F1E7] text-black'} rounded-lg`} onClick={() => setSelectedSize('XL')}>XL</button>
                            <button className={`w-[30px] h-[30px] ${selectedSize === "XS" ? 'bg-[#B88E2F] text-white' : 'bg-[#F9F1E7] text-black'} rounded-lg`} onClick={() => setSelectedSize('XS')}>XS</button>
                        </div>
                    </div>
                    <div className="font-Poppins">
                        <p className="text-[14px] text-[#9F9F9F]">Color</p>
                        <div className="flex gap-4">
                            <button className={`w-[30px] h-[30px]  bg-[#816DFA] ${selectedColor === 'Purple' ? 'ring-3 ring-neutral-400' : null} rounded-full`} onClick={() => setSelectedColor('Purple')}></button>
                            <button className={`w-[30px] h-[30px]  bg-[#000000] ${selectedColor === 'Black' ? 'ring-3 ring-neutral-400' : null} rounded-full`} onClick={() => setSelectedColor('Black')}></button>
                            <button className={`w-[30px] h-[30px]   bg-[#B88E2F] ${selectedColor === 'Orange' ? 'ring-3 ring-neutral-400' : null} rounded-full`} onClick={() => setSelectedColor('Orange')}></button>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4 border-b-1   border-[#D9D9D9] pb-18">
                        <div className="w-[123px] h-[64px] border border-black rounded-lg flex items-center justify-between px-2">
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer"
                                onClick={() => setProductCount(prev => Math.max(prev - 1, 1))} // ไม่ให้ต่ำกว่า 1
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={productCount}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setProductCount(Math.max(value, 1)); // ไม่ให้ต่ำกว่า 1
                                    }
                                }}
                                className="w-10 text-center outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer"
                                onClick={() => setProductCount(prev => prev + 1)}
                            >
                                +
                            </button>
                        </div>

                        <button className="w-[215px] h-[64px] text-[20px] border-[#000000] border rounded-lg" onClick={addToCart}>Add To Cart</button>
                    </div>

                    <div className="flex gap-2">
                        <ul className="text-[#9F9F9F] font-Poppins text-[16px] flex flex-col gap-2">
                            <li>SKU</li>
                            <li>Category</li>
                            <li>Tags</li>
                            <li>Share</li>
                        </ul>
                        <ul className="text-[#9F9F9F] font-Poppins text-[16px] flex flex-col gap-2">
                            <li>:{"\u00A0\u00A0\u00A0"}SS001</li>
                            <li>:{"\u00A0\u00A0\u00A0"}Sofas</li>
                            <li>:{"\u00A0\u00A0\u00A0"}Sofa, Chair, Home, Shop</li>
                            <li className="flex gap-4 ">:<LucideFacebook /><Instagram /><Twitch />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* detail */}
            <div className="flex flex-col gap-[37px]">
                <div className="font-Poppins text-[24px] flex items-center justify-center gap-[53px] mt-10">
                    <h1 className="font-medium">Description</h1>
                    <h1 className="text-[#9F9F9F]">Additional Information</h1>
                    <h1 className="text-[#9F9F9F]">Reviews</h1>
                </div>
                <div className="text-[#9F9F9F] flex flex-col items-center justify-center">
                    <p className="mb-[30px] w-[1026px]">Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on th e road.</p>
                    <p className="w-[1026px]">Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
                </div>
                <div className="flex  flex-wrap justify-center items-center gap-[29px] border-none outline-none ">
                    <img src={product.imageUrl} alt="" className="w-[605px] h-[348px]  bg-[#F9F1E7]" />
                    <img src={product.imageUrl} alt="" className="w-[605px] h-[348px] bg-[#F9F1E7]" />
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts />

            {/* Footer */}
            <Footer />
        </div >
    )
}

export default DetailProductPage
