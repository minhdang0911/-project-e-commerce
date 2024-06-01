import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProductByID } from '../../apis/product';
import { Breakcrumb } from '../../components';

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        if (pid) {
            fetchProductData();
        }
    }, [pid]);

    const fetchProductData = async () => {
        const response = await apiGetProductByID(pid);
        console.log('data1', response);
        if (response.success) setProduct(response.productData);
    };
    return (
        <div className="w-full">
            <div className="h-[81px] bg-gray-100 flex  justify-center items-center">
                <div className="w-main ">
                    <h3>{title}</h3>
                    <Breakcrumb title={title} category={category} />
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
