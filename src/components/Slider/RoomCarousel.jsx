import { useState, useEffect } from "react"
import { useProducts } from "../useProducts "

export default function RoomCarousel() {
  const products = useProducts() || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const slidesToShow = 3
  const indicators = 4

  // ฟังก์ชันเลื่อน slide
  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(prev => (prev + 1) % products.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(prev =>
      prev === 0 ? products.length - 1 : prev - 1
    )
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToSlide = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  // useEffect สำหรับ auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide()
      }
    }, 5000) // เลื่อนทุก 3 วินาที

    return () => clearInterval(interval) // ล้าง interval เมื่อ component ถูก unmount
  }, [products.length, isTransitioning])

  if (products.length === 0) {
    return <p className="text-center">Loading...</p>
  }

  return (
    <div className="relative w-full mx-auto  ">
      {/* slide */}
      <div className="flex justify-center items-start  gap-[24px] absolute right-[-200px] top-[-280px]">
        {Array.from({ length: slidesToShow }).map((_, i) => {
          const index = (currentIndex + i) % products.length
          return (
            <div
              key={index}
              className="overflow-hidden rounded-lg transform transition-all duration-500 ease-out"
              style={{
                opacity: 1,
                transform: `scale(${i === 0 ? 1 : 0.95}) translateY(${i === 0 ? 0 : 20}px)`,
              }}
            >
              <img
                src={products[index].imageUrl}
                alt={`Slide ${index}`}
                className={`${i === 0
                  ? "w-[404px] h-[582px]"
                  : "w-[372px] h-[486px]"
                  } object-cover transition-all duration-500 ease-out hover:brightness-110`}
              />
            </div>
          )
        })}
      </div>

      {/* ปุ่ม next */}
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute top-1/2 right-2 -translate-y-1/2 w-[48px] h-[48px] bg-white text-[#B88E2F] p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
      >
        <span className="block transform transition-transform duration-200 group-hover:translate-x-0.5">
          ❯
        </span>
      </button>

      {/* จุด indicator */}
      <div className="flex justify-center mt-3 space-x-2 absolute top-60 right-100 z-50">
        {Array.from({ length: indicators }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ease-in-out transform hover:scale-125 active:scale-110 disabled:cursor-not-allowed ${currentIndex % indicators === i
                ? "bg-[#B88E2F] outline-2 outline-offset-2 outline-[#B88E2F] shadow-lg"
                : "bg-[#D8D8D8] hover:bg-[#B88E2F] hover:bg-opacity-50"
              }`}
          />
        ))}
      </div>
    </div>
  )
}