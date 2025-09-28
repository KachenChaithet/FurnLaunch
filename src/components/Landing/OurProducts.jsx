import { Link } from "react-router-dom"
import CardShowLandingPage from "../Card/CardShowLandingPage"
import { useProducts } from "../useProducts ";


const OurProducts = () => {
    const products = useProducts();
    // console.log(products);

    return (
        <div className="w-auto h-[1200px] bg-white flex flex-col items-center  gap-10">
            <div className="font-Poppins ">
                <h1 className="font-bold text-center text-[32px]">Our Products</h1>
            </div>
            <div className="grid grid-cols-4 gap-8">
                {(() => {
                    const badgeItem = products.find(product => product.badge); // เอาอันแรกที่มี badge
                    const restItems = products.filter(product => product !== badgeItem); // อื่น ๆ

                    // เอาอันที่มี discount > 0 หรือ badge
                    const highlightedItems = restItems.filter(product => product.discount > 0 || product.badge);

                    // เอาอันที่เหลือปกติ
                    const normalItems = restItems.filter(product => !(product.discount > 0 || product.badge));

                    // รวมทั้งหมด (badge ตัวแรก + highlighted + normal) แล้ว slice 8 ช่อง
                    const displayItems = badgeItem
                        ? [badgeItem, ...highlightedItems, ...normalItems].slice(0, 8)
                        : [...highlightedItems, ...normalItems].slice(0, 8);

                    return displayItems.map((Product, index) => (
                        <CardShowLandingPage
                            id={Product.id}
                            key={index}
                            image={Product.imageUrl}
                            price={Product.discountPrice}
                            badge={Product.badge}
                            product={Product.name}
                            discount={Product.discountPercent}
                            detail={Product.description}
                        />
                    ));
                })()}
            </div>


            <Link to={'shop'}><button className="hover:text-white hover:bg-[#B88E2F] cursor-pointer border border-[#B88E2F] text-[#B88E2F] font-Poppins font-semibold px-16 py-4">
                Show more
            </button></Link>



        </div>
    )
}
export default OurProducts