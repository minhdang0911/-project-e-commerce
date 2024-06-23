import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { createSlug } from '../../utils/helper';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { categories } = useSelector((state) => state.app);
    return (
        <div className="flex flex-col w-full">
            {categories.map((category) => (
                <NavLink
                    to={createSlug(category.title)}
                    key={category._id}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                            : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                    }
                >
                    <div className="flex">
                        {category.title}
                        <div className="ml-2">({category?.brand?.length})</div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export default memo(Sidebar);
