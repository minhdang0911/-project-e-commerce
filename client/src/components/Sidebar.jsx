import React from 'react';
// import { apiGetCategories } from '../apis/app';
import { NavLink } from 'react-router-dom';
import { createSlug } from '../utils/helper';
import { useSelector } from 'react-redux';

function Sidebar() {
    const { categories } = useSelector((state) => state.app);
    return (
        <div className="flex flex-col">
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
                    {category.title}
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;
