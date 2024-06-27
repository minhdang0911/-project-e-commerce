import { apiGetAllOrder } from 'apis';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Revenue = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);

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
                setFilteredOrders(ordersWithConvertedTotal);
                calculateTotalRevenue(ordersWithConvertedTotal);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const filterOrders = () => {
        if (startDate) {
            const endOfDay = endDate ? new Date(endDate) : new Date(startDate);
            endOfDay.setHours(23, 59, 59, 999);

            const filtered = allOrders.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= startDate && orderDate <= endOfDay;
            });
            setFilteredOrders(filtered);
            calculateTotalRevenue(filtered);
        } else {
            setFilteredOrders(allOrders);
            calculateTotalRevenue(allOrders);
        }
    };

    const calculateTotalRevenue = (orders) => {
        const total = orders.reduce((sum, order) => sum + order.total, 0);
        const totalVND = exchangeRate ? total * exchangeRate : 0;
        setTotalRevenue(totalVND);
    };

    useEffect(() => {
        if (exchangeRate !== null) {
            fetchAllOrder();
        }
    }, [exchangeRate]);

    useEffect(() => {
        fetchExchangeRate();
        document.title = 'Doanh thu';
    }, []);

    useEffect(() => {
        filterOrders();
    }, [startDate, endDate]);

    const formatVND = (amount) => {
        if (amount === null || amount === undefined) return '-';
        return amount.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Doanh thu</h1>
            <div className="flex mb-4">
                <div className="mr-4">
                    <label className="block mb-2">Từ ngày</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="p-2 border border-gray-300 rounded"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div>
                    <label className="block mb-2">Đến ngày</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="p-2 border border-gray-300 rounded"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">STT</th>
                            <th className="px-4 py-2 border-b">Ngày</th>
                            <th className="px-4 py-2 border-b">Tổng tiền (USD)</th>
                            <th className="px-4 py-2 border-b">Tổng tiền (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b text-center">{order.originalSerialNumber}</td>
                                <td className="px-4 py-2 border-b text-center">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    {order.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </td>
                                <td className="px-4 py-2 border-b text-center">{formatVND(order.totalVND)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-right">
                <span className="text-lg font-bold">Tổng doanh thu(vnd): </span>
                <span className="text-lg">{formatVND(totalRevenue)}</span>
            </div>
        </div>
    );
};

export default Revenue;
