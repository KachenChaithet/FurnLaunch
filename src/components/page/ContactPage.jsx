import Navbar from "../Navbar/Navbar"
import bg1 from '../../assets/image/Rectangle 1.png'
import logo from '../../assets/image/loogonly.png'
import { Clock, MapPin, Phone } from "lucide-react"
import ShowReward from "../ShowReward"
import Footer from "../Landing/Footer"
const ContactPage = () => {
    return (
        <div>
            {/* Hero */}
            <div className="bg-cover bg-center h-[316px]  flex justify-center items-center" style={{ backgroundImage: `url(${bg1})` }}>
                <div className="font-Poppins ">
                    <div className="flex flex-col items-center -space-y-4">
                        <img src={logo} alt="" className="w-[77px] h-[77px]" />
                        <h1 className='font-medium text-[48px]'>Contact</h1>
                    </div>

                    <div className="flex items-center gap-2 justify-center text-gray-500 text-[16px] font-Poppins font-medium">
                        <span className="cursor-pointer hover:text-black">Home</span>
                        <span>{'>'}</span>
                        <span className="text-black">Contact</span>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className="h-[1144px] flex flex-col   justify-around">
                <div className="font-Poppins flex  flex-col items-center justify-center text-center space-y-[7px]">
                    <h1 className="text-[36px] font-semibold">Get In Touch With Us</h1>
                    <p className="w-[644px] text-[16px]  text-[#9F9F9F]">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                </div>
                <div className="flex justify-around items-start px-40  gap-[42px]">
                    {/* contact */}
                    <div className="flex flex-col gap-[42px]">
                        <div className="flex gap-2">
                            <MapPin />
                            <div className="font-Poppins">
                                <h1 className="font-medium text-[24px]">Address</h1>
                                <p className="w-[212px] text-[16px]">236 5th SE Avenue, New York NY10000, United States</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Phone />
                            <div className="font-Poppins">
                                <h1 className="font-medium text-[24px]">Phone</h1>
                                <p className="w-[212px] text-[16px]">Mobile: +(84) 546-6789
                                    Hotline: +(84) 456-6789</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Clock />
                            <div className="font-Poppins">
                                <h1 className="font-medium text-[24px]">Working Time</h1>
                                <p className="w-[212px] text-[16px]">Monday-Friday: 9:00 - 22:00
                                    Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>
                    </div>
                    {/* input */}
                    <div className="space-y-[36px]">
                        <div className="font-Poppins space-y-[22px]">
                            <h1 className="font-medium text-[16px]">Your name</h1>
                            <input type="text" placeholder="Abc" className="outline-0 rounded-lg w-[528.75px] h-[75px] border-[#9F9F9F] pl-8 border" />
                        </div>
                        <div className="font-Poppins space-y-[22px]">
                            <h1 className="font-medium text-[16px]">Email address</h1>
                            <input type="text" placeholder="Abc@def.com" className="outline-0 rounded-lg w-[528.75px] h-[75px] border-[#9F9F9F] pl-8 border" />
                        </div>
                        <div className="font-Poppins space-y-[22px]">
                            <h1 className="font-medium text-[16px]">Subject</h1>
                            <input type="text" placeholder="This is an optional" className="outline-0 rounded-lg w-[528.75px] h-[75px] border-[#9F9F9F] pl-8 border" />
                        </div>
                        <div className="font-Poppins space-y-[22px]">
                            <h1 className="font-medium text-[16px]">Message</h1>
                            <input type="text" placeholder="Hi! i’d like to ask about" className="outline-0 rounded-lg w-[527px] h-[120px] border-[#9F9F9F] pl-8 border " />
                        </div>
                        <button className="w-[237px] h-[55px] font-Poppins text-[16px] text-white bg-[#B88E2F] rounded-lg">Submit</button>
                    </div>
                </div>
            </div>

            <ShowReward/>
            <Footer/>
        </div>
    )
}
export default ContactPage