import React, { memo } from 'react';

const Banner = () => {
    return (
        <div className="w-full">
            <img
                src="https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg"
                alt="banner"
                className="h-[400px] w-full object-cover"
            />
        </div>
    );
};

export default memo(Banner);
