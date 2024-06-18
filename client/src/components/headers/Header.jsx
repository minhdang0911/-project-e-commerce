import React, { Fragment, memo, useEffect, useState } from 'react';
import logo from '../../assets/logo.JPG';
import icons from '../../utils/icons';
import { useNavigate, Link } from 'react-router-dom';
import path from '../../utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/user/userSlice';
import withBaseComponent from 'hocs/withBaseComponent';
import { showCart } from 'store/app/appSlice';

const Header = () => {
    const { MdSettingsPhone, MdOutlineEmail, IoBagHandleOutline, FaUser } = icons;
    const navigate = useNavigate();
    const [isShowOption, setIsShowOption] = useState(false);
    const { current } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutOption = (e) => {
            const profile = document.getElementById('profile');
            if (!profile?.contains(e.target)) setIsShowOption(false);
        };
        document.addEventListener('click', handleClickOutOption);
        return () => {
            document.removeEventListener('click', handleClickOutOption);
        };
    }, []);

    return (
        <header className="w-full bg-white shadow">
            <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center h-[80px] py-[20px] px-4 sm:px-6 lg:px-8">
                <img
                    src={logo}
                    alt="logo"
                    className="w-[100px] h-[100px] object-contain cursor-pointer"
                    onClick={() => navigate(path.HOME)}
                />

                <div className="flex flex-col sm:flex-row text-[13px] items-center gap-4 sm:gap-6">
                    <div className="flex flex-col items-center text-center sm:border-r sm:px-6">
                        <span className="flex gap-2 items-center">
                            <MdSettingsPhone color="red" />
                            <span className="font-semibold">(+84) 919 222 333</span>
                        </span>
                        <span>Thứ 2 - chủ nhật 9:00AM - 8:00PM</span>
                    </div>

                    <div className="flex flex-col items-center text-center sm:border-r sm:px-6">
                        <span className="flex gap-2 items-center">
                            <MdOutlineEmail color="red" />
                            <span className="font-semibold">minhdang9a8@gmail.com</span>
                        </span>
                        <span>Hỗ trợ 24/7</span>
                    </div>

                    {current && (
                        <Fragment>
                            <div
                                onClick={() => dispatch(showCart())}
                                className="cursor-pointer flex items-center justify-center gap-2 sm:border-r sm:px-6"
                            >
                                <IoBagHandleOutline color="red" />
                                <span>{`${current?.cart?.length || 0} item(s)`}</span>
                            </div>
                            <div
                                id="profile"
                                onClick={() => setIsShowOption((prev) => !prev)}
                                className="relative cursor-pointer flex items-center justify-center gap-2 sm:px-6"
                            >
                                <FaUser size={14} />
                                <span>Hồ sơ</span>
                                {isShowOption && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex flex-col absolute top-full right-0 bg-white border shadow-lg rounded-md py-2 z-10"
                                    >
                                        <Link
                                            className="p-2 hover:bg-gray-100 w-full whitespace-nowrap"
                                            to={`${path.MEMBER}/${path.PERSONAL}`}
                                        >
                                            Thông tin tài khoản
                                        </Link>
                                        {+current.role === 2001 && (
                                            <Link
                                                className="p-2 hover:bg-gray-100 w-full"
                                                to={`${path.ADMIN}/${path.DASHBOARD}`}
                                            >
                                                Quản trị
                                            </Link>
                                        )}
                                        <span
                                            onClick={() => dispatch(logout())}
                                            className="p-2 hover:bg-gray-100 w-full cursor-pointer"
                                        >
                                            Đăng xuất
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </header>
    );
};

export default withBaseComponent(memo(Header));
