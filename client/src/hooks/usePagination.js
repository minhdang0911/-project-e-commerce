import React, { useMemo } from 'react';
import { generateRange } from '../utils/helper';
import { BsThreeDots } from 'react-icons/bs';

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
    const paginationArray = useMemo(() => {
        const pageSize = Number(process.env.REACT_APP_PRODUCTS_LIMIT) || 10;
        const paginationCount = Math.ceil(totalProductCount / pageSize);
        const totalPaginationItem = siblingCount * 2 + 5;

        if (paginationCount <= totalPaginationItem) {
            return generateRange(1, paginationCount);
        }

        const leftSiblingCount = Math.max(currentPage - siblingCount, 1);
        const rightSiblingCount = Math.min(currentPage + siblingCount, paginationCount);

        let pages = [1];
        if (leftSiblingCount > 2) {
            pages.push(<BsThreeDots key="start-dots" />);
        }

        for (let i = leftSiblingCount; i <= rightSiblingCount; i++) {
            pages.push(i);
        }

        if (rightSiblingCount < paginationCount - 1) {
            pages.push(<BsThreeDots key="end-dots" />);
        }

        if (paginationCount > 1) {
            pages.push(paginationCount);
        }

        return pages;
    }, [totalProductCount, currentPage, siblingCount]);

    return paginationArray;
};

export default usePagination;
