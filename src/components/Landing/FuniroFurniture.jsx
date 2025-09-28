import image1 from '../../assets/image/Rectangle 37.png'
import image2 from '../../assets/image/Rectangle 39.png'
import image3 from '../../assets/image/Rectangle 40.png'
import image4 from '../../assets/image/Rectangle 41.png'
import image5 from '../../assets/image/Rectangle 43.png'
import image6 from '../../assets/image/Rectangle 44.png'
import image7 from '../../assets/image/Rectangle 45.png'
import image8 from '../../assets/image/Rectangle 38.png'
import image9 from '../../assets/image/Rectangle 36.png'

const FuniroFurniture = () => {
    return (
        <div className="w-auto h-[850px] bg-white mt-16 relative overflow-hidden">
            <div className="font-Poppins text-center">
                <p className="font-semibold text-[20px] text-[#616161]">Share your setup with</p>
                <h1 className="font-bold text-[40px]">#FuniroFurniture</h1>
            </div>
            <img src={image3} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[295px] h-[392px] right-164 top-50'  />
            <img src={image5} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[290px] h-[348px] right-88 top-40'  />
            <img src={image7} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[425px] h-[433px] right-[-90px] top-19 hidden md:block'  />
            <img src={image4} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[178px] h-[242px] right-116 top-130'  />
            <img src={image6} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[258px] h-[196px] right-48 top-130'  />
            <img src={image2} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[344px] h-[242px] left-76 top-110'  />
            <img src={image8} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[451px] h-[312px] left-49 top-30'  />
            <img src={image1} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[381px] h-[323px] left-[-100px] top-110'  />
            <img src={image9} alt="" className='hover:scale-105 transition  duration-500 ease-out absolute w-[274px] h-[382px] left-[-90px] top-10'  />
        </div>
    )
}
export default FuniroFurniture