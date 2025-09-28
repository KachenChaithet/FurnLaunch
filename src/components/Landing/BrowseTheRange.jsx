import image1 from '../../assets/image/Mask Group.png'
import image2 from '../../assets/image/Image-living room.png'
import image3 from '../../assets/image/Mask Grdoup.png'

const BrowseTheRange = () => {
    return (
        <div className="w-auto h-[812.53px] flex flex-col items-center justify-center gap-10">
            <div className="font-Poppins ">
                <h1 className="font-bold text-center text-[32px]">Browse The Range</h1>
                <h2 className="text-[20px] text-[#666666]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
            </div>

            <div className="flex  gap-4">
                <div className="font-Poppins text-center">
                    <img src={image1} alt="image1" className='w-[381px] h-[480px] transition-transform duration-300 ease-in-out hover:scale-102' />
                    <h1 className='font-semibold text-[24px]'>Dining</h1>
                </div>
                <div className="font-Poppins text-center">
                    <img src={image2} alt="image1" className='w-[381px] h-[480px] transition-transform duration-300 ease-in-out hover:scale-102' />
                    <h1 className='font-semibold text-[24px]'>Living</h1>
                </div>
                <div className="font-Poppins text-center">
                    <img src={image3} alt="image1" className='w-[381px] h-[480px] transition-transform duration-300 ease-in-out hover:scale-102' />
                    <h1 className='font-semibold text-[24px]'>Bedroom</h1>
                </div>
            </div>

        </div>
    )
}
export default BrowseTheRange