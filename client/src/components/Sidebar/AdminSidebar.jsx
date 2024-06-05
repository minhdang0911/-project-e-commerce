import React, { memo, Fragment, useState } from 'react';
import logo from '../../assets/logo1.png';
import { adminSidebar } from '../../utils/contants';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-blue-500';
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-100';

const AdminSidebar = () => {
    const [actived, setActived] = useState([]);

    const handleShowTabs = (tabID) => {
        setActived((prev) => (prev.includes(tabID) ? prev.filter((el) => el !== tabID) : [...prev, tabID]));
    };

    return (
        <div className="bg-white h-full py-4">
            <div className="flex justify-center items-center gap-2 flex-col p-4">
                <Link to="/">
                    {' '}
                    <img src={logo} alt="logo" className="w-[200px] object-contain" />
                </Link>
                <small>Chức năng quản trị</small>
            </div>
            <div>
                {adminSidebar.map((el) => (
                    <Fragment key={el.id}>
                        {el.type === 'single' && (
                            <NavLink
                                to={el.path}
                                className={({ isActive }) => clsx(isActive ? activedStyle : notActivedStyle)}
                            >
                                <span>{el.icon}</span>
                                <span>{el.text}</span>
                            </NavLink>
                        )}
                        {el.type === 'parent' && (
                            <div className="flex flex-col  ">
                                <div
                                    onClick={() => handleShowTabs(el.id)}
                                    className="px-4 py-2 justify-between flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{el.icon}</span>
                                        <span>{el.text}</span>
                                    </div>
                                    {actived.includes(el.id) ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                                </div>
                                {actived.includes(el.id) && (
                                    <div className="flex flex-col pl-4">
                                        {el.submemu.map((item) => (
                                            <NavLink
                                                onClick={(e) => e.stopPropagation()}
                                                key={item.text}
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    clsx(isActive ? activedStyle : notActivedStyle, 'pl-10')
                                                }
                                            >
                                                {item.text}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default memo(AdminSidebar);
