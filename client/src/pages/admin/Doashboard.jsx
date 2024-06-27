import React, { useState, useEffect } from 'react';
import { apiGetUsers } from '../../apis/user';
import { apiGetProduct } from '../../apis/product';
import { useSelector } from 'react-redux';
import { apiGetAllOrder } from '../../apis/product';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts'; // Added PieChart, Pie, Cell
import { FaUser, FaBox, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import path from 'utils/path';

const Dashboard = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const { categories } = useSelector((state) => state.app);
    const [dailyRevenue, setDailyRevenue] = useState([]);

    useEffect(() => {
        document.title = 'Thống kê';
    }, []);

    const fetchUsers = async () => {
        const response = await apiGetUsers();
        if (response.success) setUsersCount(response.user.length);
    };

    const fetchProduct = async () => {
        const response = await apiGetProduct();
        if (response.success) setProductCount(response.counts);
    };

    const fetchOrder = async () => {
        try {
            const response = await apiGetAllOrder();
            if (response.success) {
                const orders = response.products;
                const revenueData = calculateDailyRevenue(orders);
                setDailyRevenue(revenueData);
                setOrderCount(response.counts);
            } else {
                console.error('Failed to fetch order data');
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    const calculateDailyRevenue = (orders) => {
        const revenueMap = {};
        orders.forEach((order) => {
            const createdAt = new Date(order.createdAt).toLocaleDateString();
            const total = order.total;
            if (revenueMap[createdAt]) {
                revenueMap[createdAt] += total;
            } else {
                revenueMap[createdAt] = total;
            }
        });

        const revenueData = Object.keys(revenueMap).map((date) => ({
            date,
            'doanh-thu': revenueMap[date],
        }));

        return revenueData;
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchUsers(), fetchProduct(), fetchOrder()]);
            setCategoryCount(categories.length);
        };
        fetchData();
    }, [categories]);

    const dataPie = [
        { name: 'Người dùng', value: usersCount },
        { name: 'Sản phẩm', value: productCount },
        { name: 'Danh mục sản phẩm', value: categoryCount },
        { name: 'Đơn hàng', value: orderCount },
    ];

    const COLORS = ['#3182CE', '#38A169', '#F6E05E', '#F56565'];

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Thống kê</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                    to={`/${path.ADMIN}/${path.MANAGE_USER}`}
                    className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 shadow-lg rounded-lg flex items-center"
                >
                    <FaUser className="text-white text-4xl mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-white">Tổng số người dùng</h2>
                        <p className="text-white text-2xl">{usersCount}</p>
                        <p className="text-white">Xem chi tiết</p>
                    </div>
                </Link>
                <Link
                    to={`/${path.ADMIN}/${path.MANAGE_PRODUCTS}`}
                    className="bg-gradient-to-r from-green-400 to-green-600 p-4 shadow-lg rounded-lg flex items-center"
                >
                    <FaBox className="text-white text-4xl mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-white">Tổng số sản phẩm</h2>
                        <p className="text-white text-2xl">{productCount}</p>
                        <p className="text-white">Xem chi tiết</p>
                    </div>
                </Link>
                <Link className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 shadow-lg rounded-lg flex items-center">
                    <FaList className="text-white text-4xl mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-white">Tổng số danh mục sản phẩm</h2>
                        <p className="text-white text-2xl">{categoryCount}</p>
                        <p className="text-white">Xem chi tiết</p>
                    </div>
                </Link>

                <Link
                    to={`/${path.ADMIN}/${path.MANAGE_ORDER}`}
                    className="bg-gradient-to-r from-red-400 to-red-600 p-4 shadow-lg rounded-lg flex items-center"
                >
                    <FaList className="text-white text-4xl mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-white">Tổng số đơn hàng</h2>
                        <p className="text-white text-2xl">{orderCount}</p>
                        <p className="text-white">Xem chi tiết</p>
                    </div>
                </Link>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Biểu đồ tổng quan</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={dataPie}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {dataPie.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Biểu đồ doanh thu theo ngày</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={dailyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="date" tick={{ fill: '#555' }} />
                        <YAxis tick={{ fill: '#555' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="doanh-thu" fill="#3182CE" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
