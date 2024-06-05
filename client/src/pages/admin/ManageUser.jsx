import React, { useEffect, useState } from 'react';
import { apiGetUsers } from '../../apis/user';
import { roles } from '../../utils/contants';
import moment from 'moment';
import InputField from '../../components/inputs/inputField';
import useDebounce from 'hooks/useDebounce';
import { Pagination } from 'components';

const ManageUser = () => {
    const [users, setUsers] = useState(null);
    const [query, setQuery] = useState({
        q: '',
    });

    const fetchUsers = async (params) => {
        const response = await apiGetUsers({ ...params });
        if (response.success) setUsers(response);
    };

    const queriesDebounce = useDebounce(query.q, 800);

    useEffect(() => {
        const params = {};
        if (queriesDebounce) params.q = queriesDebounce;
        fetchUsers(params);
    }, [queriesDebounce]);

    return (
        <div className="w-full">
            <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold px-4 border-b">
                <span className="text-[18px]">Quản lý người dùng</span>
            </h1>
            <div className="w-full p-4">
                <div className="flex justify-end py-4">
                    <InputField
                        nameKey={'q'}
                        value={query.q}
                        setValue={setQuery}
                        style={'w500'}
                        placeholder="tìm kiếm người dùng theo tên hoặc email"
                        isHideLabel
                    />
                </div>
                <table className="table-auto mb-6 text-left w-full">
                    <thead className=" text-white font-bold bg-gray-700 text-[13px] ">
                        <tr className="border border-gray-500">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Họ và tên</th>
                            <th className="px-4 py-2">Vai trò</th>
                            <th className="px-4 py-2">Số điện thoại</th>
                            <th className="px-4 py-2">Trạng thái</th>
                            <th className="px-4 py-2">Ngày tạo</th>
                            <th className="px-4 py-2">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.user?.map((el, index) => (
                            <tr key={index} className="border border-gray-500">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{el.email}</td>
                                <td className="py-2 px-4">{`${el.firstname} ${el.lastname}`}</td>
                                <td className="py-2 px-4">{roles.find((role) => +role.code === +el.role)?.value}</td>
                                <td className="py-2 px-4">{el.mobile}</td>
                                <td className="py-2 px-4">{el.isBlocked ? 'Tài khoản bị khóa' : 'Hoạt động'}</td>
                                <td className="py-2 px-4">{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                <td>
                                    <span className="px-2 text-orange-600 hover:underline cursor-pointer">Sửa</span>
                                    <span className="px-2 text-orange-600 hover:underline cursor-pointer">Xóa</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <div className="w-full text-right flex justify-end">
                    <Pagination totalCount={users?.counts} />
                </div> */}
            </div>
        </div>
    );
};

export default ManageUser;
