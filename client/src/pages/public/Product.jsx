import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { Breakcrumb } from '../../components';
import { apiGetProduct } from '../../apis';
import Masonry from 'react-masonry-css';
import { Product, SeachItem, Pagination } from '../../components';
import InputSelect from '../../components/inputs/InputSelect';
import { sorts } from '../../utils/contants';
const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const Products = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [products, setProducts] = useState(null);
    const [activeClick, setActiveClick] = useState(null);
    const [sort, setSort] = useState('');
    const [params] = useSearchParams();

    const fetchProductsByCategory = async (queries) => {
        if (queries.price) {
            if (queries.price.gte) queries.price.gte = Number(queries.price.gte);
            if (queries.price.lte) queries.price.lte = Number(queries.price.lte);
        }

        if (category && category !== 'tat-ca-san-pham') queries.category = category;

        const response = await apiGetProduct(queries);
        console.log('sp', response);
        if (response.success) setProducts(response);
    };

    useEffect(() => {
        const existingParams = new URLSearchParams(params);
        const queries = {};
        for (let [key, value] of existingParams.entries()) {
            if (key === 'from' || key === 'to') {
                const numberValue = Number(value);
                if (!isNaN(numberValue)) {
                    queries.price = queries.price || {};
                    if (key === 'from') queries.price.gte = numberValue;
                    if (key === 'to') queries.price.lte = numberValue;
                }
            } else {
                queries[key] = value;
            }
        }

        fetchProductsByCategory(queries);
        window.scrollTo(0, 0);
    }, [params]);

    const changeActiveFilter = useCallback(
        (name) => {
            if (activeClick === name) setActiveClick(null);
            else setActiveClick(name);
        },
        [activeClick],
    );

    const changeValue = useCallback(
        (value) => {
            setSort(value);
        },
        [sort],
    );

    useEffect(() => {
        if (sort) {
            const existingParams = new URLSearchParams(params);
            existingParams.set('sort', sort);
            navigate(`/${category}?${existingParams.toString()}`);
        }
    }, [sort]);

    const handleSearchByPrice = (from, to) => {
        const existingParams = new URLSearchParams(params);
        existingParams.set('from', from);
        existingParams.set('to', to);
        navigate(`/${category}?${existingParams.toString()}`);
    };

    useEffect(() => {
        document.title = `${category}`;
    });
    return (
        <div className="w-full">
            <div className="h-[81px] bg-gray-100 flex justify-center items-center">
                <div className="w-main">
                    <h3 className="font-semi-bold uppercase">{category}</h3>
                    <Breakcrumb category={category} />
                </div>
            </div>
            <div className="w-main border p-4 flex justify-between mt-8 m-auto gap-3">
                <div className="w-4/5 flex-auto flex flex-col">
                    <span className="font-semibold text-sm">Tìm kiếm theo</span>
                    <div className="flex items-center gap-4">
                        <SeachItem
                            type="input"
                            name="price"
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            handleSearch={handleSearchByPrice}
                        />
                        <SeachItem name="color" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
                    </div>
                </div>
                <div className="w=1/5  flex flex-col gap-3">
                    <span className="font-semibold text-sm">Sắp xếp theo</span>
                    <div className="w-full">
                        <InputSelect value={sort} options={sorts} changeValue={changeValue} />
                    </div>
                </div>
            </div>
            <div className="mt-8 w-main m-auto">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column mb-[-20px]"
                >
                    {products?.products?.map((item) => (
                        <Product normal={true} pid={item._id} key={item.id} productData={item} />
                    ))}
                </Masonry>
            </div>
            <div className="  w-main m-auto my-4 flex justify-end">
                <Pagination totalCount={products?.counts} />
            </div>
            <div className="w-full h-[500px]"></div>
        </div>
    );
};

export default Products;
