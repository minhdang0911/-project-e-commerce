import React from 'react';
import logo from '../assets/logo.JPG';
import icons from '../utils/icons';
import { useNavigate } from 'react-router-dom';
import path from '../utils/path';

const Header = () => {
    const { MdSettingsPhone, MdOutlineEmail, IoBagHandleOutline, FaUser } = icons;
    const navigate = useNavigate();

    return (
        <div className=" w-main flex justify-between h-[110px] py-[35px]">
            <img
                src={logo}
                alt="logo"
                className="w-[234px] object-contain cursor-pointer"
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
                <div className="flex items-center justify-center gap-2 px-6 border-r">
                    <IoBagHandleOutline color="red" />
                    <span>0 item(s) </span>
                </div>
                <div className="flex items-center justify-center px-6  ">
                    <FaUser size={14} />
                </div>
            </div>
        </div>
    );
};
export default Header;
