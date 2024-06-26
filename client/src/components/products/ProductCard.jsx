import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import path from 'utils/path';
import { reanderStartFromNumber, formatMoney } from '../../utils/helper';

const ProductCard = ({ price, totalRatings, title, image, pid, category }) => {
    const navigate = useNavigate();
    console.log('image', category);
    return (
        <div
            className="w-1/3 flex-auto px-[10px] mb-[20px] cursor-pointer"
            onClick={(e) => {
                navigate(`/${category?.toLowerCase()}/${pid}/${title}`);
                e.stopPropagation();
            }}
        >
            <div className="flex w-full border">
                <img src={image} alt="product" className="w-[90px] object-contain p-4" />
                <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-xs">
                    <span className="line-clamp-1 capitalize text-sm ">{title?.toLowerCase()}</span>
                    <span className="flex h-4">
                        {reanderStartFromNumber(totalRatings, 14)?.map((el) => (
                            <span key={el._id}>{el}</span>
                        ))}
                    </span>
                    <span>{`${formatMoney(price)}`}</span>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductCard);
