import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from 'utils/path';
import { useSelector } from 'react-redux';
import { AdminSidebar } from 'components';

const Adminlayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    if (!isLoggedIn || !current || current.role !== '2001') return <Navigate to={`/${path.LOGIN}`} replace={true} />;
    return (
        <div className="flex w-full bg-gray-100 min-h-screen relative text-gray-900">
            <div className="w-[327px] flex-none fixed top-0 bottom-0">
                <AdminSidebar />
            </div>
            <div className="w-[327px]"></div>
            <div className="flex-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Adminlayout;
