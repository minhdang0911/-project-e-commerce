import React, { memo } from 'react';

const SelectQuantity = ({ quantity, handleQuantity, handleChanglQuantity }) => {
    return (
        <div className="flex items-center">
            <button onClick={() => handleChanglQuantity('minus')} className="p-2 border-r cursor-pointer border-black">
                -
            </button>
            <input
                type="number"
                className="py-2 outline-none w-[50px] text-center"
                value={quantity || ''}
                onChange={(e) => handleQuantity(e.target.value)}
                min={1}
            />
            <button onClick={() => handleChanglQuantity('plus')} className="p-2 border-l cursor-pointer border-black">
                +
            </button>
        </div>
    );
};

export default memo(SelectQuantity);
