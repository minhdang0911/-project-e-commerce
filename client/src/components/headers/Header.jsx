import React, { Fragment, memo } from 'react';
import logo from '../../assets/logo.JPG';
import icons from '../../utils/icons';
import { useNavigate, Link } from 'react-router-dom';
import path from '../../utils/path';
import { useSelector, UseSelector } from 'react-redux';

const Header = () => {
    const { MdSettingsPhone, MdOutlineEmail, IoBagHandleOutline, FaUser } = icons;
    const navigate = useNavigate();
    const { current } = useSelector((state) => state.user);

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
                        <Link
                            to={
                                current?.role === '2001'
                                    ? `/${path.ADMIN}/${path.DASHBOARD}`
                                    : `/${path.MEMBER}/${path.PERSONAL}`
                            }
                            className="cursor-pointer flex items-center justify-center px-6  gap-2 "
                        >
                            <FaUser size={14} />
                            <span>Hồ sơ</span>
                        </Link>
                    </Fragment>
                )}
            </div>
        </div>
    );
};
export default memo(Header);
