import { Congrat, InputForm, Paypal } from 'components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from 'utils/helper';
import payment from '../../assets/Payment.gif';
import { getCurrent } from 'store/user/asyncAction';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { currentCart, current } = useSelector((state) => state.user);
    const [isSuccess, setIsSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            dispatch(getCurrent());
        }
    }, [isSuccess]);

    // Local state to manage currentCart
    const [currentCartLocal, setCurrentCart] = useState([]);

    // Set initial value for currentCartLocal when currentCart changes
    useEffect(() => {
        setCurrentCart(currentCart);
    }, [currentCart]);

    return (
        <div className="p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6">
            {isSuccess && <Congrat />} {/* Show congratulations message upon success */}
            <div className="w-full flex justify-center items-center col-span-4">
                <img src={payment} alt="payment" className="h-[70%] object-contain" />
            </div>
            <div className="flex flex-col gap-6 col-span-6 w-full justify-center">
                <h2 className="text-3xl font-bold mb-6">Thanh toán đơn hàng</h2>
                <div className="flex gap-6 justify-between w-full">
                    <div className="flex-1">
                        <table className="table-auto h-fit">
                            <thead>
                                <tr className="border bg-gray-200">
                                    <th className="text-left p-2">Sản phẩm</th>
                                    <th className="text-center p-2">Số lượng</th>
                                    <th className="text-right p-2">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCartLocal.map((item) => (
                                    <tr key={item.product._id} className="border">
                                        <td className="text-left p-2">{item.product.title}</td>
                                        <td className="text-center p-2">{item.quantity}</td>
                                        <td className="text-right p-2">{formatMoney(item.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-6">
                            <span className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Tổng tiền</span>
                                <span className="text-main font-bold">
                                    {formatMoney(
                                        currentCartLocal.reduce((sum, item) => item.price * item.quantity + sum, 0),
                                    )}
                                </span>
                            </span>

                            <span className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Địa chỉ</span>
                                <span className="text-main font-bold">{current?.address}</span>
                            </span>
                        </div>
                        <div className="w-full mx-auto">
                            <Paypal
                                payload={{
                                    products: currentCartLocal,
                                    total: Math.round(
                                        currentCartLocal.reduce((sum, item) => item.price * item.quantity + sum, 0) /
                                            23500,
                                    ),
                                    address: current?.address,
                                }}
                                setIsSuccess={setIsSuccess}
                                amount={Math.round(
                                    currentCartLocal.reduce((sum, item) => item.price * item.quantity + sum, 0) / 23500,
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
