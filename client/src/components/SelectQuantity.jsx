import React, { memo } from 'react';

const SelectQuantity = ({ quantity, handleQuantity, handleChanglQuantity }) => {
    return (
        <div className="flex items-center">
            <span onClick={() => handleChanglQuantity('minus')} className=" p-2 border-r cursor-pointer border-black">
                -
            </span>
            <input
                type="text"
                className="py-2 outline-none w-[50px] text-center"
                value={quantity}
                onChange={(e) => handleQuantity(e.target.value)}
            />
            <span onClick={() => handleChanglQuantity('plus')} className=" p-2 border-l cursor-pointer border-black">
                +
            </span>
        </div>
    );
};

export default memo(SelectQuantity);
