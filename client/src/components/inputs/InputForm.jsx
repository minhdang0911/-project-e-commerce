import React, { memo } from 'react';
import clsx from 'clsx';
const InputForm = ({
    defaultValue,
    label,
    disabled,
    register,
    errors,
    id,
    validate,
    type = 'text',
    placeholder,
    fullWidth,
    style,
}) => {
    return (
        <div className={clsx('flex flex-col h-[78px] gap-2 ', style)}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('form-input my-auto', fullWidth && 'w-full', style)}
                defaultValue={defaultValue}
            />
            {errors[id] && <small className="text-xs text-red-500">{errors[id]?.message}</small>}
        </div>
    );
};

export default memo(InputForm);
