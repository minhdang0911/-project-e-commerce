import { Breakcrumb, Button, SelectQuantity } from 'components';
import OrderItem from 'components/products/OrderItem';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney } from 'utils/helper';
import path from 'utils/path';

const DetailCart = ({ location, dispatch }) => {
    const { currentCart } = useSelector((state) => state.user);

    const handleChangeQuantites = (pid, quantity, color) => {
        // console.log(pid, quantity, color);
        // console.log(currentCart);
    };

    console.log(currentCart);

    return (
        <div className="w-full">
            <div className="h-[81px] bg-gray-100 flex justify-center items-center">
                <div className="w-main">
                    <h3 className="font-semi-bold uppercase text-2xl">Chi tiết giỏ hàng</h3>
                    {/* <Breakcrumb category={location.pathname?.replace('/', '')?.split('-').join('')} /> */}
                </div>
            </div>
            <div className="flex flex-col border mt-8 w-main mx-auto my-8 ">
                <div className="font-bold grid-cols-10 w-main mx-auto grid bg-gray-200 ">
                    <span className="col-span-6 w-full">Sản phẩm</span>
                    <span className="col-span-1 w-full ml-[20px]">Số lượng</span>
                    <span className="col-span-3 w-full ml-[180px]">Giá</span>
                </div>
                {currentCart?.map((el) => (
                    <OrderItem el={el} key={el?.product} defaultQuantity={el.quantity} />
                ))}
            </div>
            <div className="w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12">
                <span className="flex items-center gap-8 text-sm">
                    <span>Tổng tiền</span>
                    <span className="text-main font-bold">{`${formatMoney(
                        currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0),
                    )}`}</span>
                </span>
                <span className="text-xs italic">
                    Vận chuyển, thuế và giảm giá được tính khi thanh toán. Cập nhật giỏ hàng
                </span>
                <Link target="_blank" className="bg-main text-white px-4 py-2 rounded-md" to={`/${path.CHECKOUT}`}>
                    Checkout
                </Link>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(DetailCart));
