import React, { useEffect, memo } from 'react';
import usePagination from '../../hooks/usePagination';
import Pagiitem from './Pagiitem';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams();
    useEffect(() => {
        const page = 1;
    }, [params]);
    const pagination = usePagination(totalCount, 2);

    const range = () => {
        const currentPage = +params.get('page');
        const pageSize = +process.env.REACT_APP_PRODUCTS_LIMIT || 10;
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalCount);

        return `${start} - ${end}`;
    };

    return (
        <div className="flex w-full justify-between items-center">
            {!+params.get('page') && (
                <span className="text-sm italic">{`Hiển thị sản phẩm từ 1 - ${
                    process.env.REACT_APP_PRODUCTS_LIMIT || 10
                } trên ${totalCount}`}</span>
            )}
            {+params.get('page') && (
                <span className="text-sm italic">{`Hiển thị sản phẩm từ ${range()} trên ${totalCount}`}</span>
            )}
            <div className="flex items-center">
                {pagination?.map((el) => (
                    <Pagiitem key={el}>{el}</Pagiitem>
                ))}
            </div>
        </div>
    );
};

export default memo(Pagination);
