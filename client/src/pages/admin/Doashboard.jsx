import React, { useState, useEffect } from 'react';
import { apiGetUsers } from '../../apis/user';
import { apiGetProduct } from 'apis';
import { useSelector } from 'react-redux';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { FaUser, FaBox, FaList } from 'react-icons/fa';

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
            <h1 className="text-2xl font-bold mb-4">Thống kê</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 shadow-lg rounded-lg flex items-center">
                    <FaUser className="text-white text-4xl mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-white">Tổng số người dùng</h2>
                        <p className="text-white text-2xl">{usersCount}</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 shadow-lg rounded-lg flex items-center">
                    <FaBox className="text-white text-4xl mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-white">Tổng số sản phẩm</h2>
                        <p className="text-white text-2xl">{productCount}</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 shadow-lg rounded-lg flex items-center">
                    <FaList className="text-white text-4xl mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-white">Tổng số danh mục sản phẩm</h2>
                        <p className="text-white text-2xl">{categoryCount}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="name" tick={{ fill: '#555' }} />
                        <YAxis tick={{ fill: '#555' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value1" name="Tổng số người dùng" fill="#3182CE" barSize={30} />
                        <Bar dataKey="value2" name="Tổng số sản phẩm" fill="#38A169" barSize={30} />
                        <Bar dataKey="value3" name="Tổng số danh mục sản phẩm" fill="#F6E05E" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
