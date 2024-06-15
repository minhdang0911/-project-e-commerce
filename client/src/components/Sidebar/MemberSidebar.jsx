import React, { memo, useState } from 'react';
import { memberSidebar } from '../../utils/contants';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import avartardefault from '../../assets/avartardefault.jpg';

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-blue-500';
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-100';

const MemberSidebar = () => {
    const [actived, setActived] = useState([]);
    const { current } = useSelector((state) => state.user);

    const handleShowTabs = (tabID) => {
        setActived((prev) => (prev.includes(tabID) ? prev.filter((el) => el !== tabID) : [...prev, tabID]));
    };

    return (
        <div className="bg-white h-full py-4 w-[250px] lg:w-[250px] flex-none">
            <div className="w-full flex flex-col items-center justify-center py-4">
                <img src={current?.avatar || avartardefault} alt="logo" className="w-16 h-16 object-cover" />
                <small>{`${current?.firstname} ${current?.lastname}`}</small>
            </div>
            <div>
                {memberSidebar.map((el) => (
                    <div key={el.id}>
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
                            <div className="flex flex-col">
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(MemberSidebar);
