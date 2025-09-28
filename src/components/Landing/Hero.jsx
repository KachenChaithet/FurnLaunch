import Logo from '../../assets/image/Logo.png'
import header1 from '../../assets/image/header1.png'
import header2 from '../../assets/image/header2.png'
import header3 from '../../assets/image/header3.png'
import header4 from '../../assets/image/header4.png'
import bgHero from '../../assets/image/bgHero.png'
import Navbar from '../Navbar/Navbar'

const Hero = () => {
    return (
        <div
            className="w-auto h-[812.53px] relative"
            style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Navbar */}

            {/* Card */}
            <div className="w-[643px] h-[443px] bg-[#FFF3E3] rounded-lg absolute top-70 right-20 font-Poppins p-8  flex flex-col gap-4 " >
                <div className="font-Poppins">
                    <h5 className='text-[16px] font-semibold text-[#333333]'>New Arrival</h5>
                    <h1 className='font-bold text-[52px] text-[#B88E2F] w-[400px] leading-[65px]'>Discover Our New Collection</h1>
                    <p className='text-[18px] font-medium text-[#333333] mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                    </p>
                </div>
                <button className='bg-[#B88E2F] font-Poppins font-bold text-white w-[222px] h-[75px] mt-8  '>
                    BUY NOW
                </button>
            </div>
        </div>
    )
}

export default Hero
