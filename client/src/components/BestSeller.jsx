import React, { useState, useEffect } from 'react';
import { apiGetProduct } from '../apis/product';
import Product from './Product';
import Slider from 'react-slick';

const tabs = [
    {
        id: 1,
        name: 'best seller',
    },
    {
        id: 2,
        name: 'new arrivals',
    },
    {
        id: 3,
        name: 'Tablet',
    },
];

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [product, setProduct] = useState(null); // Initialize product state directly with useState

    const fetchProduct = async () => {
        try {
            const response = await Promise.all([
                apiGetProduct({ sort: '-sold' }),
                apiGetProduct({ sort: '-createdAt' }),
            ]);
            if (response[0]?.success) setBestSeller(response[0].products);
            if (response[1]?.success) setNewProduct(response[1].products);
            setProduct(response[0].products);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        if (activeTab === 1) setProduct(bestSeller);
        if (activeTab === 2) setProduct(newProduct);
    }, [activeTab, bestSeller, newProduct]);

    return (
        <div>
            <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
                {tabs.map((el) => (
                    <span
                        key={el.id}
                        className={`font-semibold cursor-pointer capitalize border-r text-gray-400 ${
                            activeTab === el.id ? 'text-gray-900' : ''
                        }`}
                        onClick={() => setActiveTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className="mt-4 mx-[-10px]">
                <Slider {...settings}>
                    {product?.map((item, index) => (
                        <Product pid={item.id} key={index} productData={item} isNew={activeTab === 1 ? false : true} />
                    ))}
                </Slider>
            </div>
            <div className="w-full flex gap-4 mt-8">
                <img
                    className="flex-1 object-contain"
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    alt=""
                />
                <img
                    className="flex-1 object-contain"
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    alt=""
                />
            </div>
        </div>
    );
};

export default BestSeller;
