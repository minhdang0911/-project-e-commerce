import React, { useState, useEffect } from 'react';
import { apiGetUsers } from '../../apis/user';
import { apiGetProduct } from 'apis';
import { useSelector } from 'react-redux';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const { categories } = useSelector((state) => state.app);

    const fetchUsers = async () => {
        const response = await apiGetUsers();
        if (response.success) setUsersCount(response.user.length);
    };

    const fetchProduct = async () => {
        const response = await apiGetProduct();
        if (response.success) setProductCount(response.counts);
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchUsers(), fetchProduct()]);
            setCategoryCount(categories.length);
        };
        fetchData();
    }, [categories]);

    const data = [
        { name: 'Tổng số người dùng', value1: usersCount },
        { name: 'Tổng số sản phẩm', value2: productCount },
        { name: 'Tổng số danh mục sản phẩm', value3: categoryCount },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-200 p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Tổng số người dùng</h2>
                    <p className="text-gray-600">{usersCount}</p>
                </div>
                <div className="bg-green-200 p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Tổng số sản phẩm</h2>
                    <p className="text-gray-600">{productCount}</p>
                </div>
                <div className="bg-yellow-200 p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Tổng số danh mục sản phẩm</h2>
                    <p className="text-gray-600">{categoryCount}</p>
                </div>
            </div>
            <div className="mt-8">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="value1" name="Tổng số người dùng" fill="#3182CE" />
                        <Bar dataKey="value2" name="Tổng số sản phẩm" fill="#38A169" />
                        <Bar dataKey="value3" name="Tổng số danh mục sản phẩm" fill="#F6E05E" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
