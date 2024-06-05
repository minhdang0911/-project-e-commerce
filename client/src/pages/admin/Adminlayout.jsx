import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from 'utils/path';
import { useSelector } from 'react-redux';

const Adminlayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    if (!isLoggedIn || !current || current.role !== '2001') return <Navigate to={`/${path.LOGIN}`} replace={true} />;
    return (
        <div>
            <div>Adminlayout</div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Adminlayout;
