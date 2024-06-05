import React, { useState, memo } from 'react';
import clsx from 'clsx';

const InputField = ({
    value,
    setValue,
    nameKey,
    type,
    invalidFields,
    setInvalidFields,
    style,
    fullWidth,
    placeholder,
    isHideLabel,
}) => {
    return (
        <div className={clsx(' relative flex flex-col  ', fullWidth && 'w-full')}>
            {!isHideLabel && value?.trim() !== '' && (
                <label
                    className={clsx(
                        'text-[10px] absolute animate-slide-top-sm top-[9px] left-[12px]  block bg-white px-1',
                        style,
                    )}
                    htmlFor={nameKey}
                >
                    {nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
                </label>
            )}

            <input
                type={type || 'text'}
                value={value}
                onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
                className="px-4 py-2 mt-2 outline-none rounded-sm border w-full my-4 placeholder:text-sm placeholder:italic"
                placeholder={placeholder || nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {/* {invalidFields?.some((el) => el.name === nameKey) && (
                <small className="text-main text-[12px] italic">
                    {invalidFields?.find((el) => el.name === nameKey)?.mes}
                </small>
            )} */}

            {Array.isArray(invalidFields) && invalidFields.some((el) => el.name === nameKey) && (
                <small className="text-main text-[12px] italic">
                    {invalidFields.find((el) => el.name === nameKey)?.mes}
                </small>
            )}
        </div>
    );
};

export default memo(InputField);
