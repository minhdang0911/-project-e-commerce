import React, { useCallback, useEffect, useState } from 'react';
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from '../../apis/user';
import { roles, blockStatus } from '../../utils/contants';
import moment from 'moment';
import InputField from '../../components/inputs/inputField';
import useDebounce from 'hooks/useDebounce';
import { Pagination } from 'components';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { InputForm, Select, Button } from 'components';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import clsx from 'clsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ManageUser = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        email: '',
        firstname: '',
        lastname: '',
        role: '',
        phone: '',
        status: '',
        isBlocked: '',
    });
    const [users, setUsers] = useState(null);
    const [query, setQuery] = useState({ q: '' });
    const [editElm, setEditElm] = useState(null);
    const [update, setUpdate] = useState(false);
    const params = useSearchParams();

    useEffect(() => {
        document.title = 'Quản lý người dùng';
    }, []);

    const render = useCallback(() => {
        setUpdate(!update);
    }, [update]);

    const fetchUsers = async (params) => {
        const response = await apiGetUsers({ ...params });
        if (response.success) setUsers(response);
    };

    const queriesDebounce = useDebounce(query.q, 800);

    useEffect(() => {
        const params = {};
        if (queriesDebounce) params.q = queriesDebounce;
        fetchUsers(params);
    }, [queriesDebounce, update]);

    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editElm._id);
        if (response.success) {
            setEditElm(null);
            render();
            toast.success('Cập nhật người dùng thành công');
        } else toast.error('Cập nhật người dùng thất bại');
    };

    const handleDeleteUser = (uid) => {
        Swal.fire({
            title: 'Xóa người dùng?',
            text: 'Bạn có chắc muốn xóa người dùng này',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid);
                if (response.success) {
                    render();
                    toast.success('Xóa người dùng thành công');
                } else toast.error('Xóa người dùng thất bại');
            }
        });
    };

    const handleExport = () => {
        if (!users || !users.user || users.user.length === 0) {
            toast.error('Không có dữ liệu để xuất');
            return;
        }

        const data = users.user.map((user) => ({
            Email: user.email,
            Họ: user.firstname,
            Tên: user.lastname,
            'Vai trò': roles.find((role) => +role.code === +user.role)?.value,
            'Số điện thoại': user.mobile,
            'Trạng thái': user.isBlocked ? 'Tài khoản bị khóa' : 'Hoạt động',
            'Ngày tạo': moment(user.createdAt).format('DD/MM/YYYY'),
        }));

        console.log('Exporting data:', data); // Debugging line

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');

        // ... Styles and settings for XLSX sheet ...

        // Use XLSX.write to generate the binary string
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

        // Convert the binary string to a Blob
        const s2ab = (s) => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
            return buf;
        };

        // Create a Blob and force the download
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
        saveAs(blob, 'UserList.xlsx');
    };

    return (
        <div className={clsx('w-full p-4 md:p-8 lg:p-12 bg-gray-50', editElm && 'pl-16')}>
            <h1 className="text-2xl lg:text-3xl font-semibold mb-6 border-b pb-4">Quản lý người dùng</h1>
            <div className="w-full mb-4 flex justify-between">
                <InputField
                    nameKey={'q'}
                    value={query.q}
                    setValue={setQuery}
                    className={'w-full md:w-1/2 lg:w-1/3'}
                    placeholder="Tìm kiếm người dùng theo tên hoặc email"
                    isHideLabel
                />
                <Button handleOnClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Xuất danh sách
                </Button>
            </div>
            <div className="overflow-x-auto">
                <form onSubmit={handleSubmit(handleUpdate)}>
                    {editElm && <Button type="submit">Cập nhật</Button>}
                    <table className="table-auto w-full mb-6 text-left border-collapse bg-white rounded-lg shadow-lg">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Họ</th>
                                <th className="px-4 py-2">Tên</th>
                                <th className="px-4 py-2 whitespace-nowrap w-[200px]">Vai trò</th>
                                <th className="px-4 py-2">Số điện thoại</th>
                                <th className="px-4 py-2 w-[200px]">Trạng thái</th>
                                <th className="px-4 py-2">Ngày tạo</th>
                                <th className="px-4 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <TransitionGroup component="tbody">
                            {users?.user?.map((el, index) => (
                                <CSSTransition key={el._id} timeout={500} classNames="fade">
                                    <tr className="hover:bg-gray-100 transition-colors mt-[-10px]">
                                        <td className="py-2 px-4 border-t">{index + 1}</td>
                                        <td className="py-2 px-4 border-t">
                                            {editElm?._id === el._id ? (
                                                <InputForm
                                                    fullWidth
                                                    register={register}
                                                    errors={errors}
                                                    id={'email'}
                                                    validate={{
                                                        required: true,
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: 'Vui lòng nhập đúng định dạng email ',
                                                        },
                                                    }}
                                                    defaultValue={editElm.email}
                                                    style="mt-10"
                                                />
                                            ) : (
                                                <span>{el.email}</span>
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-t">
                                            {editElm?._id === el._id ? (
                                                <InputForm
                                                    defaultValue={editElm.firstname}
                                                    fullWidth
                                                    register={register}
                                                    errors={errors}
                                                    id={'firstname'}
                                                    validate={{ required: 'Vui lòng nhập trường này' }}
                                                    style="mt-10"
                                                />
                                            ) : (
                                                <span>{el.firstname}</span>
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-t">
                                            {editElm?._id === el._id ? (
                                                <InputForm
                                                    defaultValue={editElm.lastname}
                                                    fullWidth
                                                    register={register}
                                                    errors={errors}
                                                    id={'lastname'}
                                                    validate={{ required: 'Vui lòng nhập trường này' }}
                                                    style="mt-10"
                                                />
                                            ) : (
                                                <span>{el.lastname}</span>
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-t">
                                            {editElm?._id === el._id ? (
                                                <Select
                                                    defaultValue={el.role}
                                                    fullWidth
                                                    register={register}
                                                    errors={errors}
                                                    id={'role'}
                                                    validate={{ required: 'Vui lòng nhập trường này' }}
                                                    options={roles}
                                                />
                                            ) : (
                                                <span>{roles.find((role) => +role.code === +el.role)?.value}</span>
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-t">
                                            {editElm?._id === el._id ? (
                                                <InputForm
                                                    defaultValue={editElm.mobile}
                                                    fullWidth
                                                    register={register}
                                                    errors={errors}
                                                    style="mt-10"
                                                    id={'mobile'}
                                                    validate={{
                                                        required: 'Vui lòng nhập số điện thoại',
                                                        pattern: {
                                                            value: /^0\d{9}$/,
                                                            message: 'Số điện thoại phải bắt đầu bằng số 0 và có 10 số',
                                                        },
                                                    }}
                                                />
                                            ) : (
                                                <span>{el.mobile}</span>
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-t">
                                            {editElm?._id === el._id ? (
                                                <Select
                                                    defaultValue={el.isBlocked}
                                                    fullWidth
                                                    register={register}
                                                    errors={errors}
                                                    id={'isBlocked'}
                                                    validate={{ required: 'Vui lòng nhập trường này' }}
                                                    options={blockStatus}
                                                />
                                            ) : (
                                                <span>{el.isBlocked ? 'Tài khoản bị khóa' : 'Hoạt động'}</span>
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-t">
                                            {moment(el.createdAt).format('DD/MM/YYYY')}
                                        </td>
                                        <td className="py-2 px-4 border-t">
                                            {editElm?._id === el._id ? (
                                                <span
                                                    onClick={() => setEditElm(null)}
                                                    className="whitespace-nowrap text-blue-600 hover:underline cursor-pointer mr-2"
                                                >
                                                    Trở lại
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={() => setEditElm(el)}
                                                    className="text-blue-600 hover:underline cursor-pointer mr-2"
                                                >
                                                    Sửa
                                                </span>
                                            )}
                                            <span
                                                onClick={() => handleDeleteUser(el._id)}
                                                className="text-red-600 hover:underline cursor-pointer"
                                            >
                                                Xóa
                                            </span>
                                        </td>
                                    </tr>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </table>
                </form>
            </div>
            {/* Pagination */}
            {users && users.counts > 0 && (
                <div className="flex justify-end mt-4">
                    <Pagination totalCount={users.counts} />
                </div>
            )}
        </div>
    );
};

export default ManageUser;
