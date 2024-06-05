import React, { memo } from 'react';

const Button = ({ children, handleOnClick, style, fw }) => {
    return (
        <button
            onClick={() => {
                handleOnClick && handleOnClick();
            }}
            type="button"
            className={
                style ? style : `px-4 py-2 rounded-md text-white bg-main my-2 text-semibold ${fw ? 'w-full' : 'w-fit'}`
            }
        >
            {children}
        </button>
    );
};

export default memo(Button);
