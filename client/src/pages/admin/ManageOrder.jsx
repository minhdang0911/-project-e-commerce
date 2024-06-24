import { apiGetAllOrder } from 'apis'; // Thay thế bằng hàm API thực tế của bạn
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; // Sử dụng axios để gửi yêu cầu API

Modal.setAppElement('#root');

const ManageOrder = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);
    const [exchangeRate, setExchangeRate] = useState(null); // State để lưu trữ tỷ giá hối đoái

    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            if (response.data && response.data.rates && response.data.rates.VND) {
                setExchangeRate(response.data.rates.VND);
            } else {
                console.error('Failed to fetch exchange rate.');
            }
        } catch (error) {
            console.error('Failed to fetch exchange rate:', error);
        }
    };

    const fetchAllOrder = async () => {
        try {
            const response = await apiGetAllOrder();
            if (response.success) {
                const ordersWithConvertedTotal = response.products.map((order) => ({
                    ...order,
                    totalVND: exchangeRate ? order.total * exchangeRate : null,
                }));
                setAllOrders(ordersWithConvertedTotal);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const openModal = (products) => {
        setSelectedOrderProducts(products);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedOrderProducts([]);
    };

    useEffect(() => {
        fetchAllOrder();
    }, [exchangeRate]);

    useEffect(() => {
        fetchExchangeRate();
    }, []);

    // Hàm để định dạng số thành chuỗi tiền tệ USD
    const formatUSD = (amount) => {
        return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    };

    // Hàm để định dạng số thành chuỗi tiền tệ VND
    const formatVND = (amount) => {
        if (amount === null || amount === undefined) return '-'; // Trả về '-' nếu không có giá trị
        return amount.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">STT</th>
                            <th className="px-4 py-2 border-b">Ngày đặt</th>
                            <th className="px-4 py-2 border-b">Trạng thái</th>
                            <th className="px-4 py-2 border-b">Tổng tiền (USD)</th>
                            <th className="px-4 py-2 border-b">Tổng tiền (VND)</th>
                            <th className="px-4 py-2 border-b">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b text-center">{order.originalSerialNumber}</td>
                                <td className="px-4 py-2 border-b text-center">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td className="px-4 py-2 border-b text-center">{order.status}</td>
                                <td className="px-4 py-2 border-b text-center">{formatUSD(order.total)}</td>
                                <td className="px-4 py-2 border-b text-center">{formatVND(order.totalVND)}</td>
                                <td className="px-4 py-2 border-b text-center">
                                    <button
                                        onClick={() => openModal(order.products)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Order Products"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
                    <h2 className="text-2xl font-bold mb-4">Chi tiết dơn hàng</h2>
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Tên sản phẩm</th>
                                    <th className="px-4 py-2 border-b">Số lượng</th>
                                    <th className="px-4 py-2 border-b">Màu sắc</th>
                                    <th className="px-4 py-2 border-b">Giá (USD)</th>
                                    <th className="px-4 py-2 border-b">Hình ảnh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrderProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b text-center">{product.title}</td>
                                        <td className="px-4 py-2 border-b text-center">{product.quantity}</td>
                                        <td className="px-4 py-2 border-b text-center">{product.color}</td>
                                        <td className="px-4 py-2 border-b text-center">{product.price}</td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="w-16 h-16 object-cover mx-auto"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ManageOrder;
