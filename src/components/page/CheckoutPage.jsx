import { useEffect, useState } from 'react';
import bg1 from '../../assets/image/Rectangle 1.png';
import logo from '../../assets/image/loogonly.png';
import Input from '../Input/Input';
import Footer from '../Landing/Footer';
import Navbar from '../Navbar/Navbar';
import ShowReward from '../ShowReward';
import axios from 'axios';
import { AwardIcon } from 'lucide-react';

const inputDetail = [
    { title: "Company Name (Optional)", width: 453, height: 75, placeholder: "Enter your company name", required: false },
    { title: "Country / Region", width: 453, height: 75, placeholder: "Enter your country or region", required: true },
    { title: "Street address", width: 453, height: 75, placeholder: "Enter your street address", required: true },
    { title: "Town / City", width: 453, height: 75, placeholder: "Enter your town or city", required: true },
    { title: "Province", width: 453, height: 75, placeholder: "Enter your province", required: true },
    { title: "ZIP code", width: 453, height: 75, placeholder: "Enter your ZIP code", required: true },
    { title: "Phone", width: 453, height: 75, placeholder: "Enter your phone number", required: true },
    { title: "", width: 453, height: 75, placeholder: "Additional information", required: false }
];


const CheckoutPage = () => {
    const [productlist, setProductlist] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [billingData, setBillingData] = useState({});


    const totalPrice = productlist.reduce((sum, item) => {
        const price = item.discountPrice || item.price;
        return sum + price * item.quantity;
    }, 0);

    // อัปเดต billing data เมื่อกรอก input
    const handleChange = (title, value) => {
        let key;
        switch (title) {
            case "First Name":
                key = "FirstName";
                break;
            case "Last Name":
                key = "LastName";
                break;
            case "Company Name (Optional)":
                key = "company";
                break;
            case "Country / Region":
                key = "country";
                break;
            case "Street address":
                key = "address";
                break;
            case "Town / City":
                key = "city";
                break;
            case "Province":
                key = "province";
                break;
            case "ZIP code":
                key = "zip";
                break;
            case "Phone":
                key = "phone";
                break;
            case "":
                key = "note";
                break;
            default:
                key = title; // fallback
        }
        setBillingData(prev => ({ ...prev, [key]: value }));
    };

    const getKey = (title) => {
        switch (title) {
            case "First Name": return "FirstName";
            case "Last Name": return "LastName";
            case "Company Name (Optional)": return "company";
            case "Country / Region": return "country";
            case "Street address": return "address";
            case "Town / City": return "city";
            case "Province": return "province";
            case "ZIP code": return "zip";
            case "Phone": return "phone";
            case "": return "note";
            default: return title;
        }
    };



    const handleSubmit = async () => {
        const requiredFields = ["address", "city", "province", "zip", "phone"];
        for (let field of requiredFields) {
            if (!billingData[field]) {
                alert(`Please fill in ${field}`);
                return;
            }
        }
        const payload = {
            billing: billingData,
            items: productlist.map(item => ({
                id: item.id,
                name: item.name,
                img: item.img,
                price: item.price,
                discountPrice: item.discountPrice,
                quantity: item.quantity,
                color: item.color,
                size: item.size
            }))
        };
        try {
            const response = await axios.post('http://localhost:5000/checkout', payload)
            console.log("Order placed:", response.data);
            alert("Order successfully placed!");
            setBillingData({})
            localStorage.removeItem('cart');
            setProductlist([])
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Something went wrong");
        }

    }
    return (
        <div>
            <div className="bg-cover bg-center h-[316px] flex justify-center items-center" style={{ backgroundImage: `url(${bg1})` }}>
                <div className="font-Poppins flex flex-col items-center -space-y-4">
                    <img src={logo} alt="" className="w-[77px] h-[77px]" />
                    <h1 className='font-medium text-[48px]'>Checkout</h1>
                </div>
            </div>

            <div className="h-[1629px] flex justify-around mt-20">
                {/* Billing Input */}
                <div className="flex flex-col">
                    <h1 className='font-Poppins font-semibold text-[36px] mb-[36px]'>Billing details</h1>
                    <div className="flex justify-center mb-[36px] gap-[31px]">
                        <Input higth={75} width={211} title={'First Name'} placeholder={''} value={billingData.FirstName || ''} onChange={val => handleChange("FirstName", val)} />
                        <Input higth={75} width={211} title={'Last Name'} placeholder={''} value={billingData.LastName || ''} onChange={val => handleChange("LastName", val)} />
                    </div>
                    <div className="flex flex-col gap-[36px]">
                        {inputDetail.map((p, index) => {
                            const key = getKey(p.title);
                            return (
                                <Input
                                    key={index}
                                    value={billingData[key] || ''}
                                    required={p.required}
                                    higth={p.height}
                                    width={p.width}
                                    title={p.title}
                                    placeholder={p.placeholder}
                                    onChange={val => handleChange(p.title, val)}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-[608px] mt-10">
                    <div className="flex justify-between pb-[34px] border-[#D9D9D9] border-b">
                        <ul className='font-Poppins space-y-[14px]'>
                            <li className='font-medium text-[24px]'>Product</li>
                            {productlist.map(item => (
                                <li key={item.id} className='text-[#9F9F9F]'>{item.name} x {item.quantity}</li>
                            ))}
                            <li>Subtotal</li>
                            <li>Total</li>
                        </ul>
                        <ul className='font-Poppins space-y-[14px] text-end'>
                            <li className='font-medium text-[24px]'>Subtotal</li>
                            {productlist.map(item => (
                                <li key={item.id} className='text-[#9F9F9F] font-light text-[16px]'>{item.discountPrice * item.quantity} TH</li>
                            ))}
                            <li className='font-light'>{totalPrice} TH</li>
                            <li className='font-bold text-[24px] text-[#B88E2F]'>{productlist.length > 0 ? totalPrice + 1000 : 0} TH</li>
                        </ul>
                    </div>

                    <div className="text-center mt-[39px]">
                        <button className='w-[318px] h-[64px] border rounded-lg text-[20px] font-Poppins' onClick={handleSubmit} >Place order</button>
                    </div>
                </div>
            </div>

            <ShowReward />
            <Footer />
        </div>
    )
};

export default CheckoutPage;
