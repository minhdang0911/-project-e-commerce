import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from 'utils/path';
import { useSelector } from 'react-redux';

const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
    return (
        <div>
            MemberLayout
            <Outlet />
        </div>
    );
};

export default MemberLayout;
