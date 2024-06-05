import React, { memo } from 'react';
// import { IoEyeSharp, IoMdMenu } from 'react-icons/io';
// import { FaHeart } from 'react-icons/fa';

const SelectOption = ({ icon }) => {
    // Lấy icon từ props
    return (
        <div
            className="hover:bg-gray-800 hover:border-gray-800 hover:text-white cursor-pointer 
        w-10 h-10 bg-white rounded-full border shadow-md flex items-center justify-center"
        >
            {icon}
        </div>
    );
};

export default memo(SelectOption);
