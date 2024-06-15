import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../../utils/contants';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="w-full h-[48px] py-2 border-y mb-6 text-sm flex items-center justify-between sm:justify-start">
                <div className="sm:hidden flex items-center">
                    <FaBars className="text-xl cursor-pointer" onClick={toggleSidebar} />
                </div>
                <div className="hidden sm:flex w-full ml-[250px]">
                    {navigation.map((el) => (
                        <NavLink
                            to={el.path}
                            key={el.id}
                            className={({ isActive }) =>
                                isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'
                            }
                        >
                            {el.value}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:hidden z-50`}
            >
                <div className="flex justify-end p-4">
                    <FaTimes className="text-2xl cursor-pointer" onClick={toggleSidebar} />
                </div>
                <nav className="flex flex-col p-4">
                    {navigation.map((el) => (
                        <NavLink
                            to={el.path}
                            key={el.id}
                            onClick={toggleSidebar}
                            className={({ isActive }) =>
                                isActive ? 'py-2 hover:text-main text-main' : 'py-2 hover:text-main'
                            }
                        >
                            {el.value}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Overlay */}
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}
        </>
    );
};

export default memo(Navigation);
