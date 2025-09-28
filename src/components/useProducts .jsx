import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchDataProduct = async () => {
        try {
            const res = await axios.get("http://localhost:5000/product/get");

            // คำนวณ discountPrice ก่อนเก็บลง state
            const productsWithDiscount = res.data.map(product => {
                const discountPercent = product.discountPercent ?? 0;
                const discountPrice =
                    discountPercent > 0
                        ? product.price - (product.price * discountPercent) / 100
                        : product.price;
                return { ...product, discountPrice };
            });

            setProducts(productsWithDiscount);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataProduct();
    }, []);

    return products; // ส่ง products ที่มี discountPrice ออกไป
};

export const useProductsPrice = (id) => {
    const [product, setProduct] = useState({})

    const fetchDataProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/product/search/${id}`);

            const data = res.data; // ได้ object ตัวเดียว
            const discountPercent = data.discountPercent ?? 0;
            const discountPrice =
                discountPercent > 0
                    ? data.price - (data.price * discountPercent) / 100
                    : data.price;

            setProduct({ ...data, discountPrice });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataProduct();
    }, [id]);
    
    return product;
};
