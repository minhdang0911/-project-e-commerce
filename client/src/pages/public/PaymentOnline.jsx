import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateOrder } from 'apis';
import { toast } from 'react-toastify';
import { formatMoney } from 'utils/helper';
import { useNavigate } from 'react-router-dom';
import { getCurrent } from 'store/user/asyncAction';

const PaymentOnline = () => {
    const { currentCart, current } = useSelector((state) => state.user);
    const [newAddress, setNewAddress] = useState(current?.address || '');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!current || !currentCart) {
        return null;
    }

    const handleSaveOrder = async () => {
        const total = currentCart.reduce((sum, item) => item.price * item.quantity + sum, 0);
        const products = currentCart.map((item) => ({
            productId: item.product._id,
            title: item.product.title,
            quantity: item.quantity,
            price: item.price,
            thumbnail: item.thumbnail,
        }));

        const orderData = {
            firstname: current.firstname,
            lastname: current.lastname,
            email: current.email,
            mobile: current.mobile,
            address: newAddress,
            total,
            products,
            status: 'Succeed',
        };

        const response = await apiCreateOrder(orderData);
        if (response?.success) {
            toast.success('Đặt hàng thành công');
            dispatch(getCurrent());
            navigate('/');
        } else {
            toast.error('Đặt hàng thất bại');
        }
    };

    return (
        <div className="p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6 animate-fadeIn">
            <div className="flex flex-col col-span-6 gap-6">
                <h2 className="text-3xl font-bold mb-6">Thanh toán đơn hàng</h2>
                <div className="flex gap-6 justify-between w-full">
                    <div className="flex-1">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="border bg-gray-200">
                                    <th className="text-left p-2">Sản phẩm</th>
                                    <th className="text-center p-2">Số lượng</th>
                                    <th className="text-right p-2">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCart.map((item) => (
                                    <tr key={item.product._id} className="border">
                                        <td className="text-left p-2 flex items-center">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.product.title}
                                                className="w-12 h-12 mr-2 rounded"
                                            />
                                            {item.product.title}
                                        </td>
                                        <td className="text-center p-2">{item.quantity}</td>
                                        <td className="text-right p-2">{formatMoney(item.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Tổng tiền</span>
                                <span className="text-main font-bold">
                                    {formatMoney(
                                        currentCart.reduce((sum, item) => item.price * item.quantity + sum, 0),
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Địa chỉ</span>
                                <input
                                    type="text"
                                    className="border p-2 w-full rounded"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Họ</span>
                                <span className="text-main font-bold">{current.lastname}</span>
                            </div>
                            <div className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Tên</span>
                                <span className="text-main font-bold">{current.firstname}</span>
                            </div>
                            <div className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Email</span>
                                <span className="text-main font-bold">{current.email}</span>
                            </div>
                            <div className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Số điện thoại</span>
                                <span className="text-main font-bold">{current.mobile}</span>
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
                            onClick={handleSaveOrder}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentOnline;
