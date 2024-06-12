import { InputForm, Paypal } from 'components';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { formatMoney } from 'utils/helper';
import payment from '../../assets/Payment.gif';
import { useForm } from 'react-hook-form';
const Checkout = () => {
    const { currentCart } = useSelector((state) => state.user);

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
    } = useForm();
    return (
        <div className=" p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6 ">
            <div className="w-full flex justify-center items-center col-span-4">
                <img src={payment} alt="payment" className="h-[70%] object-contain" />
            </div>
            <div className="flex flex-col gap-6 col-span-6 w-full justify-center">
                <h2 className="text-3xl font-bold mb-6">Thanh toán đơn hàng</h2>
                <div className="flex gap-6 justify-between w-full">
                    <table className="table-auto flex-1">
                        <thead>
                            <tr className="border bg-gray-200 ">
                                <td className="text-left p-2 ">Sản phẩm</td>
                                <td className="text-center p-2 ">Số lượng </td>
                                <td className="text-right p-2 ">Giá</td>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCart?.map((el) => (
                                <tr key={el?._id} className="border">
                                    <td className="text-left p-2 ">{el?.title}</td>
                                    <td className="text-center p-2 ">{el?.quantity}</td>
                                    <td className="text-right p-2 ">{formatMoney(el?.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex-1 flex flex-col justify-between gap-[45px]">
                        <div className="flex flex-col gap-6">
                            <span className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Tổng tiền</span>
                                <span className="text-main font-bold">{`${formatMoney(
                                    currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0),
                                )}`}</span>
                            </span>

                            <InputForm
                                label="Đia chỉ"
                                register={register}
                                errors={errors}
                                id="address"
                                validate={{ require: 'Bạn phải nhập trường này' }}
                                placeholder="Địa chỉ của bạn"
                                fullWidth
                                style="text-sm"
                            />
                        </div>
                        <div className="w-full mx-auto">
                            <Paypal amount={+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)/23500} />
                        </div>
                    </div>
                </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            </div>
        </div>
    );
};

export default memo(Checkout);
