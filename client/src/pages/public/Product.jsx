import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breakcrumb } from '../../components';
import { apiGetProduct } from '../../apis';
import Masonry from 'react-masonry-css';
import { Product, SeachItem } from '../../components';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState(null);
    const [activeClick, setActiveClick] = useState(null);
    const [params] = useSearchParams();
    const fetchProductsByCategory = async (querires) => {
        const response = await apiGetProduct(querires);
        if (response.success) setProducts(response.products);
    };

    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of params) queries[i[0]] = i[1];
        fetchProductsByCategory(queries);
    }, [params]);

    const changeActiveFilter = useCallback(
        (name) => {
            if (activeClick === name) setActiveClick(null);
            else setActiveClick(name);
        },
        [activeClick],
    );

    return (
        <div className="w-full">
            <div className="h-[81px] bg-gray-100 flex  justify-center items-center">
                <div className="w-main ">
                    <h3 className="font-semi-bold uppercase">{category}</h3>
                    <Breakcrumb category={category} />
                </div>
            </div>
            <div className="w-main border p-4 flex justify-between mt-8 m-auto gap-3  ">
                <div className="w-4/5 flex-auto  flex flex-col">
                    <span className="font-semibold text-sm  ">Tìm kiếm theo</span>
                    <div className="flex items-center gap-4">
                        <SeachItem
                            type="input"
                            name="price"
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                        />
                        <SeachItem name="color" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
                    </div>
                </div>
                <div className="w=1/5 ">sort by</div>
            </div>
            <div className="mt-8 w-main m-auto">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column mb-[-20px]"
                >
                    {products?.map((item, index) => (
                        <Product normal={true} pid={item.id} key={item.id} productData={item} />
                    ))}
                </Masonry>
            </div>
            <div className="w-full h-[500px]"></div>
        </div>
    );
};

export default Products;
