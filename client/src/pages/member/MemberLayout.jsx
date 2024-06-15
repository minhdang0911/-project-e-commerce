import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from 'utils/path';
import { useSelector } from 'react-redux';
import { MemberSidebar } from 'components';
import { AiOutlineMenu } from 'react-icons/ai';

const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    const [showSidebar, setShowSidebar] = useState(false);

    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />;

    return (
        <div className="flex h-screen">
            {/* Hamburger Menu for Mobile */}
            <div className="lg:hidden">
                <AiOutlineMenu className="text-3xl cursor-pointer" onClick={() => setShowSidebar(!showSidebar)} />
            </div>

            {/* Sidebar - Conditional class based on showSidebar state */}
            <div
                className={`bg-white h-full py-4 w-[250px] lg:w-[250px] flex-none ${
                    showSidebar ? '' : 'hidden'
                } lg:block`}
            >
                <MemberSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-auto bg-gray-100 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default MemberLayout;
