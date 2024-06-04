import React, { useMemo } from 'react';
import { generateRange } from '../utils/helper';
import { BsThreeDots } from 'react-icons/bs';

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
    const paginationArray = useMemo(() => {
        const pageSize = process.env.REACT_APP_PRODUCTS_LIMIT || 10;
        const paginationCount = Math.ceil(totalProductCount / pageSize);
        const totalPaginationItem = siblingCount * 2 + 5;

        // Trường hợp không cần hiển thị dấu chấm ba
        if (paginationCount <= totalPaginationItem) {
            return generateRange(1, paginationCount);
        }

        const siblingRange = siblingCount * 2;
        const leftSiblingCount = Math.min(currentPage - 1, siblingCount);
        const rightSiblingCount = Math.min(paginationCount - currentPage, siblingCount);

        let startPage = Math.max(currentPage - leftSiblingCount, 2);
        let endPage = Math.min(currentPage + rightSiblingCount, paginationCount - 1);

        let pages = [1];
        if (startPage > 2) {
            pages.push(<BsThreeDots key="start-dots" />);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < paginationCount - 1) {
            pages.push(<BsThreeDots key="end-dots" />);
        }

        pages.push(paginationCount);

        return pages;
    }, [totalProductCount, currentPage, siblingCount]);

    return paginationArray;
};

export default usePagination;
