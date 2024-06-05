import React, { memo, useState, useEffect } from 'react';
import icons from '../../utils/icons';
import { colors } from '../../utils/contants';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiGetProduct } from '../../apis';
import useDebounce from '../../hooks/useDebounce';

const SeachItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const { IoIosArrowDown } = icons;
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [bestPrice, setBestPrice] = useState(null);
    const [price, setPrice] = useState({
        from: '',
        to: '',
    });
    const { category } = useParams();
    const [params] = useSearchParams();

    const handleSelect = (e) => {
        const alreadyEl = selected?.find((el) => el === e.target.value);
        if (alreadyEl) setSelected((prev) => prev.filter((el) => el !== e.target.value));
        else setSelected((prev) => [...prev, e.target.value]);
        changeActiveFilter(null);
    };

    useEffect(() => {
        if (selected.length > 0) {
            const existingParams = new URLSearchParams(params);
            existingParams.set('color', selected.join(','));
            navigate(`/${category}?${existingParams.toString()}`);
        } else {
            const existingParams = new URLSearchParams(params);
            existingParams.delete('color');
            navigate(`/${category}?${existingParams.toString()}`);
        }
    }, [selected]);

    const fetchBestPriceProduct = async () => {
        const response = await apiGetProduct({ sort: '-price', limit: 1 });
        if (response?.success) setBestPrice(response?.products[0]?.price);
    };

    useEffect(() => {
        if (type === 'input') {
            fetchBestPriceProduct();
        }
    }, [type]);

    const deboucePriceFrom = useDebounce(price.from, 500);
    const deboucePriceTo = useDebounce(price.to, 500);
    useEffect(() => {
        const existingParams = new URLSearchParams(params);
        if (Number(price.from) > 0) {
            existingParams.set('from', price.from);
        } else {
            existingParams.delete('from');
        }
        if (Number(price.to) > 0) {
            existingParams.set('to', price.to);
        } else {
            existingParams.delete('to');
        }
        navigate(`/${category}?${existingParams.toString()}`);
    }, [deboucePriceFrom, deboucePriceTo]);

    return (
        <div
            onClick={() => changeActiveFilter(name)}
            className="p-3 cursor-pointer text-gray-500 gap-6 text-xs relative border border-gray-800 flex justify-between items-center"
        >
            <span className="capitalize">{name}</span>
            <IoIosArrowDown />
            {activeClick === name && (
                <div className="absolute top-[calc(100%+1px)] z-20 left-0 w-fit p-4 border bg-white min-w-[150px]">
                    {type === 'checkbox' && (
                        <div>
                            <div className="p-4 items-center flex justify-between gap-8">
                                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelected([]);
                                    }}
                                    className="underline hover:text-main cursor-pointer"
                                >
                                    Reset
                                </span>
                            </div>
                            <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-3 mt-4">
                                {colors.map((el, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            value={el}
                                            id={el}
                                            onClick={handleSelect}
                                            checked={selected.some((selectedItem) => selectedItem === el)}
                                        />
                                        <label className="capitalize text-gray-700" htmlFor={el}>
                                            {el}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {type === 'input' && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <div className="p-4 items-center flex justify-between gap-8">
                                <span className="whitespace-nowrap">{`Giá cao nhất là ${Number(
                                    bestPrice,
                                ).toLocaleString()} VNĐ`}</span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPrice({
                                            from: '',
                                            to: '',
                                        });
                                        changeActiveFilter(null);
                                    }}
                                    className="underline hover:text-main cursor-pointer"
                                >
                                    Reset
                                </span>
                            </div>
                            <div className="flex items-center p-2 gap-2">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="from">Từ</label>
                                    <input
                                        onChange={(e) => setPrice((prev) => ({ ...prev, from: e.target.value }))}
                                        className="form-input"
                                        type="number"
                                        id="from"
                                        value={price.from}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="to">Đến</label>
                                    <input
                                        onChange={(e) => setPrice((prev) => ({ ...prev, to: e.target.value }))}
                                        className="form-input"
                                        type="number"
                                        id="to"
                                        value={price.to}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(SeachItem);
