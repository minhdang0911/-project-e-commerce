import { apiGetAllOrder } from 'apis';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Pagination } from 'components';

const Revenue = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalRevenueUSD, setTotalRevenueUSD] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [error, setError] = useState(null);

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

    const fetchAllOrder = async (params) => {
        try {
            const response = await apiGetAllOrder({ ...params });
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

    const filterOrdersByDateRange = () => {
        let filtered = allOrders;

        if (startDate && !endDate) {
            filtered = filtered.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= startDate;
            });
        } else if (startDate && endDate) {
            if (endDate < startDate) {
                setError('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu');
                return;
            }
            filtered = filtered.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= startDate && orderDate <= endDate;
            });
        }

        setFilteredOrders(filtered);
        calculateTotalRevenue(filtered);
    };

    const filterOrdersByMonthAndWeek = () => {
        let filtered = allOrders;

        if (selectedMonth) {
            const monthIndex = new Date(Date.parse(`${selectedMonth} 1, 2024`)).getMonth();
            filtered = filtered.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return orderDate.getMonth() === monthIndex;
            });
        }

        if (selectedWeek) {
            filtered = filtered.filter((order) => {
                const orderDate = new Date(order.createdAt);
                const weekNumber = Math.ceil(orderDate.getDate() / 7);
                return weekNumber === parseInt(selectedWeek);
            });
        }

        setFilteredOrders(filtered);
        calculateTotalRevenue(filtered);
    };

    const calculateTotalRevenue = (orders) => {
        const total = orders.reduce((sum, order) => sum + order.total, 0); // Calculate from total USD
        setTotalRevenueUSD(total);
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
        if (startDate || endDate) {
            setError(null); // Reset error when dates are updated
            filterOrdersByDateRange();
        } else {
            filterOrdersByMonthAndWeek();
        }
    }, [startDate, endDate, selectedMonth, selectedWeek]);

    const formatVND = (amount) => {
        if (amount === null || amount === undefined) return '-';
        return amount.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Doanh thu</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex mb-4">
                <div className="mr-4">
                    <label className="block mb-2">Từ ngày</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setError(null);
                        }}
                        className="p-2 border border-gray-300 rounded"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div>
                    <label className="block mb-2">Đến ngày</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => {
                            setEndDate(date);
                            setError(null);
                        }}
                        className="p-2 border border-gray-300 rounded"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="ml-4">
                    <label className="block mb-2">Tháng</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="">Chọn tháng</option>
                        {Array.from({ length: 12 }, (v, i) => (
                            <option key={i} value={new Date(0, i).toLocaleString('default', { month: 'long' })}>
                                {new Date(0, i).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="ml-4">
                    <label className="block mb-2">Tuần</label>
                    <select
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="">Chọn tuần</option>
                        {[1, 2, 3, 4].map((week) => (
                            <option key={week} value={week}>
                                Tuần {week}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                {!error && (
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
                            {filteredOrders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border-b text-center">{index + 1}</td>
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
                )}
            </div>
            {!error && (
                <div className="flex justify-end mt-4">
                    <Pagination totalCount={allOrders?.length} />
                </div>
            )}
            <div className="mt-4 text-right">
                <span className="text-lg font-bold">Tổng doanh thu (USD): </span>
                <span className="text-lg">{totalRevenueUSD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            </div>
        </div>
    );
};

export default Revenue;
