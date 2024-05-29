import React from 'react';

const Button = ({ name, handleOnClick, style, iconsBefore, iconAfter, fw }) => {
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
            {iconsBefore}
            <span>{name}</span>
            {iconAfter}
        </button>
    );
};

export default Button;
