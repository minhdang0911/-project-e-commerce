import { Button } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { showCart, showModal } from 'store/app/appSlice';
import { formatMoney } from 'utils/helper';
import { IoTrashBinSharp } from 'react-icons/io5';
import { apiRemoveCart } from 'apis';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import path from 'utils/path';

const Cart = ({ dispatch, navigate }) => {
    const { current } = useSelector((state) => state.user);
    const removeCart = async (pid) => {
        const response = await apiRemoveCart(pid);
        if (response.success) {
            dispatch(getCurrent());
        } else toast.error(response.mes);
    };
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="p-6 w-[400px] h-screen grid grid-rows-10  overflow-y-auto bg-black text-white"
        >
            <header className="flex justify-between items-center row-span-1 h-full border-b font-bold text-2xl">
                <span>Giỏ hàng của bạn</span>
                <span className="p-2 cursor-pointer" onClick={() => dispatch(showCart())}>
                    {' '}
                    <MdClose size={24} />
                </span>
            </header>
            <section className="row-span-7 h-full max-h-full overflow-y-auto gap-3 flex flex-col">
                {!current?.cart && <span className="text-xs italic">Giỏ hàng trống</span>}
                {current.cart &&
                    current?.cart?.map((el) => (
                        <div className="flex  justify-between items-center" key={el?._id}>
                            <div className="flex gap-2">
                                <img src={el?.product?.thumb} alt="thumb" className="w-16 h-16 object-cover" />
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-main">{el.product.title}</span>
                                    <span className="text-[10px]">{el.color}</span>
                                    <span className="text-sm">{formatMoney(el?.product?.price)}</span>
                                </div>
                            </div>
                            <span
                                onClick={() => {
                                    removeCart(el.product._id);
                                }}
                            >
                                <IoTrashBinSharp
                                    size={16}
                                    className="h-5 w-5 rounded-full hover:bg-red-700 cursor-pointer flex items-center justify-center"
                                />
                            </span>
                        </div>
                    ))}
            </section>
            <div className="row-span-2 h-full ">
                <div className="flex items-center my-4 justify-between border-t">
                    <span>Tổng giá</span>
                    <span>{formatMoney(current?.cart?.reduce((sum, el) => sum + Number(el?.product?.price), 0))}</span>
                </div>
                <span className="text-center text-gray-700 italic text-xs">
                    Vận chuyển, thuế và giảm giá được tính khi thanh toán.
                </span>
                <div className="flex justify-between gap-2">
                    <Button
                        handleOnClick={() => {
                            dispatch(showCart());
                            navigate(`/${path.DETAIL_CART}`);
                        }}
                    >
                        <span className="text-[11px]">Đi đến chi tiết giỏ hàng</span>
                    </Button>
                    <Button handleOnClick={() => dispatch(showCart())}>
                        {' '}
                        <span className="text-[11px]">Tiếp tục mua hàng</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Cart));
