import React, { memo } from 'react';

const Countdown = ({ unit, number }) => {
    return (
        <div className="flex-col w-[30%] flex-auto h-[60px] flex items-center justify-center bg-[#F4F4F4] rounded-md">
            <span className="text-[18px] text-gray-800">{number}</span>
            <span className="text-xs text-gray-700">{unit}</span>
        </div>
    );
};

export default memo(Countdown);
