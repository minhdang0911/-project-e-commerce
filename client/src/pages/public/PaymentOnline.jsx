import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateOrder } from 'apis';
import { toast } from 'react-toastify';
import { formatMoney } from 'utils/helper';
import { useNavigate } from 'react-router-dom';
import { getCurrent } from 'store/user/asyncAction';
import { motion } from 'framer-motion'; // Import motion for animations

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
            color: item?.color,
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            {/* Left Section */}
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Thanh toán đơn hàng</h2>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-left py-2 px-4">Sản phẩm</th>
                                <th className="text-center py-2 px-4">Số lượng</th>
                                <th className="text-right py-2 px-4">Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCart.map((item) => (
                                <tr key={item.product._id} className="border-b">
                                    <td className="py-2 px-4 flex items-center">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.product.title}
                                            className="w-12 h-12 mr-2 rounded"
                                        />
                                        {item.product.title}
                                    </td>
                                    <td className="text-center py-2 px-4">{item.quantity}</td>
                                    <td className="text-right py-2 px-4">{formatMoney(item.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 bg-gray-100 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">Tổng tiền</span>
                            <span className="text-main font-bold">
                                {formatMoney(currentCart.reduce((sum, item) => item.price * item.quantity + sum, 0))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-medium">Địa chỉ</span>
                        <input
                            type="text"
                            className="border p-2 w-full rounded"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-medium">Họ</span>
                        <span className="text-main font-bold">{current.lastname}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-medium">Tên</span>
                        <span className="text-main font-bold">{current.firstname}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-medium">Email</span>
                        <span className="text-main font-bold">{current.email}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-medium">Số điện thoại</span>
                        <span className="text-main font-bold">{current.mobile}</span>
                    </div>
                    <button
                        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
                        onClick={handleSaveOrder}
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default PaymentOnline;
