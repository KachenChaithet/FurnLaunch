import { Award, Headset, Package, Trophy } from "lucide-react"

const showitem = [
    { icon: <Trophy className='w-[60px] h-[60px]' />, title: 'High Quality', text: 'crafted from top materials' },
    { icon: <Award className='w-[60px] h-[60px]' />, title: 'Warranty Protection', text: 'Over 2 years' },
    { icon: <Package className='w-[60px] h-[60px]' />, title: 'Warranty Protection', text: 'Order over 150 $' },
    { icon: <Headset className='w-[60px] h-[60px]' />, title: '24 / 7 Support', text: 'Dedicated support' },
]
const ShowReward = () => {
    return (
        <div className="w-auto h-[270px] bg-[#FAF3EA] flex justify-center items-center">
            <div className="flex gap-8">
                {showitem.map((a) => (
                    <div className="flex gap-2">
                        {a.icon}
                        <div className="font-Poppins ">
                            <h1 className='font-semibold text-[25px]'>{a.title}</h1>
                            <p className='font-medium text-[20px] text-[#898989]'>{a.text}</p>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    )
}
export default ShowReward