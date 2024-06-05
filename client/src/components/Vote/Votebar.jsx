import React, { memo, useRef, useEffect } from 'react';
import icons from '../../utils/icons';

const Votebar = ({ number, ratingCount, ratingTotal }) => {
    const percentRef = useRef();
    useEffect(() => {
        const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
        percentRef.current.style.cssText = `right:${100 - percent}%`;
    }, [ratingCount, ratingTotal]);
    const { FaStar, CiStar } = icons;
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex   items-center gap-1 text-sm w-[10%]">
                <span>{number}</span>
                <FaStar color="orange" />
            </div>
            <div className=" w-[75%]">
                <div className="w-full h-[6px] bg-gray-400 rounded-l-full rounded-r-full relative">
                    <div ref={percentRef} className="absolute inset-0 bg-red-500  "></div>
                </div>
            </div>
            <div className="w-[15%] text-xs text-gray-400 flex justify-end">{`${ratingCount || 0} reviewers`}</div>
        </div>
    );
};

export default memo(Votebar);
