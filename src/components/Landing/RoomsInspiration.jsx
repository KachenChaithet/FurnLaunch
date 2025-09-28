import { useState } from "react";
import RoomCarousel from "../Slider/RoomCarousel"

const RoomsInspiration = () => {

    return (
        <div className="w-auto h-[670px] bg-[#FCF8F3] flex items-center justify-around overflow-hidden">
            <div className="w-[500px] font-Poppins flex flex-col gap-4 ml-20 ">
                <h1 className="font-bold text-[40px] leading-[120%] w-[422px]">
                    50+ Beautiful rooms inspiration
                </h1>
                <p className="w-[400px] text-[16px] font-medium text-[#616161]">
                    Our designer already made a lot of beautiful prototipe of rooms that inspire you
                </p>
                <button className="text-white bg-[#B88E2F] text-[16px] font-semibold w-[176px] h-[48px]">
                    Explore More
                </button>
            </div>

            {/* ต้องมั่นใจว่า RoomCarousel มี position แบบ relative + ขนาดแน่นอน */}
            <div className="flex-1 flex justify-center">
                <RoomCarousel />
            </div>
        </div>
    )
}
export default RoomsInspiration