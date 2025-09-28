import { Link } from "react-router-dom"
import CardShowLandingPage from "./Card/CardShowLandingPage"
import { useProducts } from "./useProducts ";



const RelatedProducts = () => {
  const Products = useProducts();

  return (
    <div className="w-auto h-[777px] bg-white flex flex-col items-center  gap-10 mt-18">
      <div className="font-Poppins ">
        <h1 className="font-medium text-center text-[36px]">Related Products</h1>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {Products.sort(() => Math.random() - 0.5).slice(0, 4).map((Product) => (
          <CardShowLandingPage id={Product.id} image={Product.imageUrl} price={Product.price} badge={Product.badge} product={Product.nameproduct} discount={Product.discount} detail={Product.description} />
        ))}
      </div>
      <Link to={'/shop'}><button className="border border-[#B88E2F] text-[#B88E2F] font-Poppins font-semibold px-16 py-4">
        Show more
      </button></Link>



    </div>
  )
}
export default RelatedProducts