import BrowseTheRange from "../Landing/BrowseTheRange"
import Footer from "../Landing/Footer"
import FuniroFurniture from "../Landing/FuniroFurniture"
import Hero from "../Landing/Hero"
import OurProducts from "../Landing/OurProducts"
import RoomsInspiration from "../Landing/RoomsInspiration"
import { useProducts } from "../useProducts "

const Landingpage = () => {
    
    return (<>

        <Hero />
        <BrowseTheRange />
        <OurProducts />
        <RoomsInspiration />
        <FuniroFurniture />
        <Footer />
    </>
    )
}
export default Landingpage