import { SelectQuantity } from 'components';
import React, { useEffect, useState } from 'react';
import { formatMoney } from 'utils/helper';
import { updateCart } from 'store/user/userSlice';
import withBaseComponent from 'hocs/withBaseComponent';

const OrderItem = ({ el, handleChangeQuantites, defaultQuantity, dispatch }) => {
    const [quantity, setQuantity] = useState(() => defaultQuantity);

    const handleChanglQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return;
        if (flag === 'minus') setQuantity((prev) => prev - 1);
        if (flag === 'plus') setQuantity((prev) => prev + 1);
    };

    useEffect(() => {
        dispatch(updateCart({ pid: el?.product?._id, quantity, color: el?.color }));
    }, [quantity]);

    useEffect(() => {
        setQuantity(defaultQuantity);
    }, [defaultQuantity]);

    const handleQuantity = (number) => {
        if (number > 0) setQuantity(number);
    };

    return (
        <div className="font-bold border-b grid-cols-10 w-main mx-auto grid border py-3">
            <span className="col-span-6 w-full">
                <div className="flex gap-2">
                    <img src={el?.thumbnail || el?.thumb} alt="thumb" className="w-28 h-28 object-cover" />
                    <div className="flex flex-col gap-1 items-start">
                        <span className="text-sm text-main">{el?.title}</span>
                        <span className="text-[10px] font-main">{el?.color}</span>
                    </div>
                </div>
            </span>
            <span className="col-span-1 w-full">
                <div className="flex items-center h-full">
                    <SelectQuantity
                        quantity={quantity}
                        handleQuantity={handleQuantity}
                        handleChanglQuantity={handleChanglQuantity}
                    />
                </div>
            </span>
            <span className="col-span-3 w-full text-center h-full flex items-center justify-center">
                <span className="text-lg">{formatMoney(el?.price * quantity)}</span>
            </span>
        </div>
    );
};

export default withBaseComponent(OrderItem);
