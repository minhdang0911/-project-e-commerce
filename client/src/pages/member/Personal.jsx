import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, InputForm } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import avatardefault from '../../assets/avartardefault.jpg';
import { apiUpdateCurrent } from 'apis';
import { getCurrent } from 'store/user/asyncAction';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'; // Import skeleton component
import { useNavigate, useSearchParams } from 'react-router-dom';

const Personal = () => {
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        reset,
    } = useForm();

    const { current } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // State to control loading state
    const { searchParams } = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Thông tin cá nhân';
    }, []);

    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            email: current?.email,
            mobile: current?.mobile,
            avatar: current?.avatar,
            address: current?.address,
        });
    }, [current]);

    const handleUpdateInfor = async (data) => {
        setLoading(true); // Set loading to true when form is submitting

        const formData = new FormData();
        if (data.avatar.length > 0) formData.append('avatar', data.avatar[0]);
        delete data.avatar;
        for (let i of Object.entries(data)) formData.append(i[0], i[1]);

        const response = await apiUpdateCurrent(formData);

        if (response.success) {
            dispatch(getCurrent());
            toast.success(response.mes);
            if (searchParams && searchParams.get('redirect')) {
                navigate(searchParams.get('redirect'));
            }
        } else {
            toast.error(response.mes);
        }

        setLoading(false);
    };

    return (
        <div className="w-full px-4">
            <header className="text-3xl font-semibold py-4 border-b border-b-blue-200">Thông tin người dùng</header>
            <form
                onSubmit={handleSubmit(handleUpdateInfor)}
                className="w-full md:w-3/5 mx-auto py-8 flex flex-col gap-4"
            >
                {/* Display skeleton loading while loading */}
                {loading ? (
                    <>
                        <Skeleton height={40} />
                        <Skeleton height={40} />
                        <Skeleton height={40} />
                        <Skeleton height={40} />
                        <Skeleton height={40} />
                        {/* Add more skeletons as needed */}
                    </>
                ) : (
                    <>
                        <InputForm
                            label="Họ"
                            register={register}
                            errors={errors}
                            id="firstname"
                            validate={{ require: 'Bạn phải nhập trường này' }}
                            fullWidth
                        />

                        <InputForm
                            label="Tên"
                            register={register}
                            errors={errors}
                            id="lastname"
                            validate={{ require: 'Bạn phải nhập trường này' }}
                            fullWidth
                        />

                        <InputForm
                            label="Email"
                            register={register}
                            errors={errors}
                            id="email"
                            validate={{
                                require: 'Bạn phải nhập trường này',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|edu\.com|[a-zA-Z0-9.-]+\.vn)$/,
                                    message: 'Định dạng email không hợp lệ',
                                },
                            }}
                            fullWidth
                        />

                        <InputForm
                            label="Số điện thoại"
                            register={register}
                            errors={errors}
                            id="mobile"
                            validate={{
                                require: 'Bạn phải nhập trường này',
                                pattern: {
                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                                    message: 'Dịnh dạng số điện thoại không hợp lệ',
                                },
                            }}
                            fullWidth
                        />

                        <InputForm
                            label="Địa chỉ"
                            register={register}
                            errors={errors}
                            id="address"
                            validate={{
                                require: 'Bạn phải nhập trường này',
                            }}
                            fullWidth
                        />

                        <div className="flex items-center gap-2 ">
                            <span className="font-medium">Trạng thái tài khoản:</span>
                            <span>{current?.isBlocked ? 'Tài khoản bị khóa' : 'Hoạt động'}</span>
                        </div>

                        <div className="flex items-center gap-2 ">
                            <span className="font-medium">Vai trò:</span>
                            <span>{+current?.role === 2001 ? 'Quản trị' : 'Người dùng'}</span>
                        </div>

                        <div className="flex items-center gap-2 ">
                            <span className="font-medium">Ngày tạo tài khoản:</span>
                            <span>{moment(current?.createdAt).fromNow()}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-medium">Ảnh đại diện :</span>
                            <label htmlFor="file">
                                <img
                                    className="w-20 h-20 object-cover rounded-full ml-8"
                                    src={current?.avatar || avatardefault}
                                />
                                <input type="file" id="file" hidden {...register('avatar')} />
                            </label>
                        </div>

                        {isDirty && (
                            <div className="w-full flex justify-end">
                                <Button type="submit">Cập nhật thông tin</Button>
                            </div>
                        )}
                    </>
                )}
            </form>
        </div>
    );
};

export default Personal;
