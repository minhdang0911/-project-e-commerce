import { apiGetUserOrder } from 'apis';
import { CustomSelect, InputForm, Pagination } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, Navigate, useSearchParams } from 'react-router-dom';
import { statusOrder } from 'utils/contants';

const History = ({ navigate, location }) => {
    const [orders, setOrders] = useState(null);
    const [counts, setCounts] = useState(0);
    const [params] = useSearchParams();
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useForm();
    const q = watch('q');
    const status = watch('status');

    const fetchOrders = async (params) => {
        const response = await apiGetUserOrder({ ...params, limit: 10 });
        if (response.success) {
            setOrders(response?.products);
            setCounts(response?.counts);
        }
    };

    useEffect(() => {
        const pr = Object.fromEntries([...params]);
        fetchOrders(pr);
    }, [params]);

    const handleSearchStatus = ({ value }) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ status: value }).toString(),
        });
    };

    useEffect(() => {
        document.title = 'Lịch sử mua hàng';
    }, []);
    return (
        <div className="w-full relative px-4">
            <header className="text-2xl sm:text-3xl font-semibold py-4 border-b border-b-blue-200 px-4">
                Lịch sử mua hàng
            </header>

            <div className="flex justify-end items-center px-4 sm:px-0">
                <form className="w-[45%] flex items-center gap-4">
                    <InputForm
                        style={'w-full'}
                        id="q"
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder="Tìm kiếm đơn hàng"
                    />
                    <div className="col-span-1 flex items-center mt-[-30px] w-full">
                        <CustomSelect
                            wrapClassname="w-full"
                            options={statusOrder}
                            value={status}
                            onChange={(val) => handleSearchStatus(val)}
                        />
                    </div>
                </form>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="border bg-sky-500 text-white">
                            <th className="text-center">STT</th>
                            <th className="text-center">Sản phẩm</th>
                            <th className="text-center">Tổng tiền</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Ngày đặt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((el, indexx) => (
                            <tr className="border-b" key={el._id}>
                                <td className="text-center">{indexx + 1}</td>
                                <td className="text-center py-2 max-w-[300px]">
                                    <span className="grid grid-cols-4 gap-4">
                                        {el.products.map((item, index) => (
                                            <span className="flex col-span-1 items-center gap-2" key={index}>
                                                <img
                                                    src={item?.thumbnail}
                                                    className="w-8 h-8 rounded-md object-cover"
                                                />
                                                <span className="flex flex-col">
                                                    <span className="text-main text-[10px] whitespace-nowrap">
                                                        {item.title}
                                                    </span>
                                                    <span className="flex items-center text-xs gap-2">
                                                        <span>số lượng</span>
                                                        <span className="text-main">{item?.quantity}</span>
                                                    </span>
                                                </span>
                                            </span>
                                            // <span key={index}>• {`${item.title} - ${item.color}`}</span>
                                        ))}
                                    </span>
                                </td>
                                <td className="text-center">{el.total} 💲</td>
                                <td className="text-center">{el.status}</td>
                                <td className="text-center">{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <div className="w-full flex justify-end my-8 px-4 sm:px-0">
                <Pagination totalCount={counts} />
            </div> */}
        </div>
    );
};

export default withBaseComponent(History);
