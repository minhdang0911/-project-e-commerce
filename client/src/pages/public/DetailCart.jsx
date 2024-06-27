import { Button } from 'components';
import OrderItem from 'components/products/OrderItem';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, Link } from 'react-router-dom';
import { formatMoney } from 'utils/helper';
import path from 'utils/path';
import Swal from 'sweetalert2';

const DetailCart = ({ location, navigate }) => {
    const { currentCart, current } = useSelector((state) => state.user);
    useEffect(() => {
        document.title = 'Giỏ hàng';
    }, []);

    const handleSubmit = () => {
        if (!current?.address) {
            return Swal.fire({
                icon: 'info',
                title: 'Almost!',
                text: 'Bạn cần cập nhật địa chỉ để thanh toán',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Cập nhật',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate({
                        pathname: `/${path.MEMBER}/${path.PERSONAL}`,
                        search: createSearchParams({ redirect: location.pathname }).toString(),
                    });
                }
            });
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div className="w-full">
            <div className="h-[81px] bg-gray-100 flex justify-center items-center">
                <div className="w-main">
                    <h3 className="font-semi-bold uppercase text-2xl">Chi tiết giỏ hàng</h3>
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
                <Button handleOnClick={handleSubmit}>Checkout</Button>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(DetailCart));
