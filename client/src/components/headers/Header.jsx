import React, { Fragment, memo, useEffect, useState } from 'react';
import logo from '../../assets/logo.JPG';
import icons from '../../utils/icons';
import { useNavigate, Link } from 'react-router-dom';
import path from '../../utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/user/userSlice';

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
        <div className=" w-main flex justify-between h-[110px] py-[35px]">
            <img
                src={logo}
                alt="logo"
                className="w-[234px]  object-contain cursor-pointer"
                onClick={() => navigate(path.HOME)}
            />

            <div className="flex text-[13px]">
                <div className="flex flex-col items-center px-6 border-r">
                    <span className="flex gap-4 items-center">
                        <MdSettingsPhone color="red" />
                        <span className="font-semibold">(+84) 919 222 333</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>

                <div className="flex flex-col items-center px-6 border-r">
                    <span className="flex gap-4 items-center">
                        <MdOutlineEmail color="red" />
                        <span className="font-semibold">minhdang9a8@gmail.com</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                {current && (
                    <Fragment>
                        <div className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r">
                            <IoBagHandleOutline color="red" />
                            <span>0 item(s) </span>
                        </div>
                        <div
                            id="profile"
                            onClick={() => setIsShowOption((prev) => !prev)}
                            className="relative cursor-pointer flex items-center justify-center px-6  gap-2 "
                        >
                            <FaUser size={14} />
                            <span>Hồ sơ</span>
                            {isShowOption && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex flex-col absolute top-full left-[16px] bg-gray-100 min-w-[150px] py-2 border"
                                >
                                    <Link
                                        className="p-2 hover:bg-sky-100 w-full whitespace-nowrap"
                                        to={`${path.MEMBER}/${path.PERSONAL}`}
                                    >
                                        Thông tin người dùng
                                    </Link>
                                    {+current.role === 2001 && (
                                        <Link
                                            className="p-2 hover:bg-sky-100 w-full"
                                            to={`${path.ADMIN}/${path.DASHBOARD}`}
                                        >
                                            Quản trị
                                        </Link>
                                    )}
                                    <span onClick={() => dispatch(logout())} className="p-2 hover:bg-sky-100 w-full">
                                        {' '}
                                        Đăng xuất{' '}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    );
};
export default memo(Header);
