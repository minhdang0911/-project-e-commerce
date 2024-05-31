import React, { useState } from 'react';

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
    return (
        <div className="w-full relative flex flex-col  ">
            {value.trim() !== '' && (
                <label
                    className="text-[10px] absolute animate-slide-top-sm top-[9px] left-[12px]  block bg-white px-1"
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
                placeholder={nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
                onFocus={() => setInvalidFields([])}
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

export default InputField;
