import React, { useEffect, memo } from 'react';
import usePagination from '../../hooks/usePagination';
import Pagiitem from './Pagiitem';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalCount }) => {
    const [params, setSearchParams] = useSearchParams();
    const currentPage = +params.get('page') || 1;
    const pageSize = +process.env.REACT_APP_PRODUCTS_LIMIT || 10;
    const pagination = usePagination(totalCount, currentPage);

    useEffect(() => {
        if (currentPage < 1 || currentPage > Math.ceil(totalCount / pageSize)) {
            setSearchParams({ page: 1 });
        }
    }, [currentPage, totalCount, pageSize, setSearchParams]);

    const range = () => {
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalCount);
        return `${start} - ${end}`;
    };

    return (
        <div className="flex w-full justify-between items-center">
            <span className="text-sm italic">{`Hiển thị sản phẩm từ ${range()} trên ${totalCount}`}</span>
            <div className="flex items-center">
                {pagination?.map((el, index) => (
                    <Pagiitem key={index} onClick={() => setSearchParams({ page: el })}>
                        {el}
                    </Pagiitem>
                ))}
            </div>
        </div>
    );
};

export default memo(Pagination);
