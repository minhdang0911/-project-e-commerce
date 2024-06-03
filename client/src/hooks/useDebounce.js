import React, { useEffect, useState } from 'react';

const useDebounce = (value, ms) => {
    const [debouceValue, setDebounceValue] = useState('');
    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            setDebounceValue(value);
        }, ms);
        return () => {
            clearTimeout(setTimeOutId);
        };
    }, [value, ms]);

    return debouceValue;
};

export default useDebounce;
