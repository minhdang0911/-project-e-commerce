import React, { useState, useEffect, memo } from 'react';
import { apiGetProduct } from '../../apis/product';
import { getNewProducts } from '../../store/products/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import CustomSlider from '../common/CustomSlider';

const tabs = [
    {
        id: 1,
        name: 'Sản phẩm bán chạy',
    },
    {
        id: 2,
        name: 'Sản phẩm mới',
    },
    {
        id: 3,
        name: 'Máy tính bảng',
    },
];

const BestSeller = () => {
    const { categories } = useSelector((state) => state.app);
    const [bestSeller, setBestSeller] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const [tablet, setNewTablet] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [product, setProduct] = useState(null);

    const dispatch = useDispatch();
    const { newProducts } = useSelector((state) => state.products);
    const fetchProduct = async () => {
        const response = await apiGetProduct({ sort: '-sold', limit: 60 });
        if (response.success) {
            setBestSeller(response.products);
            setProduct(response.products);
            const productTablet = response.products.filter((el) => el.category === 'Tablet');

            setNewTablet(productTablet);
        }
    };

    useEffect(() => {
        fetchProduct();
        dispatch(getNewProducts());
    }, []);

    useEffect(() => {
        if (activeTab === 1) setProduct(bestSeller);
        if (activeTab === 2) setProduct(newProducts);
        if (activeTab === 3) setProduct(tablet);
    }, [activeTab, bestSeller, newProducts, tablet]);

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

export default memo(BestSeller);
