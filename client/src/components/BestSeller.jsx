import React, { useState, useEffect } from 'react';
import { apiGetProduct } from '../apis/product';
import { getNewProducts } from '../store/products/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import CustomSlider from './CustomSlider';

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

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [product, setProduct] = useState(null);

    const dispatch = useDispatch();
    const { newProducts } = useSelector((state) => state.products);
    console.log('newProducts', newProducts);
    const fetchProduct = async () => {
        const response = await apiGetProduct({ sort: '-sold' });
        if (response.success) {
            setBestSeller(response.products);
            setProduct(response.products);
        }
    };

    useEffect(() => {
        fetchProduct();
        dispatch(getNewProducts());
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
                <CustomSlider products={product} activeTab={activeTab} />
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
