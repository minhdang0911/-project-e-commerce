import React, { useEffect, useState } from 'react';

const useDebounce = (value, ms) => {
    const [debouceValue, setDebounceValue] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setDebounceValue(value);
        }, ms);
    }, [value, ms]);

    return debouceValue;
};

export default useDebounce;
