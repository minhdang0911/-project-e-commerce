import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from '../utils/path';
import { getCurrent } from '../store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../utils/icons';
import { logout } from '../store/user/userSlice';

const TopHeader = () => {
    const dispatch = useDispatch();
    const { IoIosLogOut } = icons;
    const { isLoggedIn, current } = useSelector((state) => state.user);

    console.log('current', current);
    useEffect(() => {
        if (isLoggedIn) dispatch(getCurrent());
    }, [dispatch, isLoggedIn]);
    return (
        <div className="h-[30px] w-full bg-main flex items-center justify-center">
            <div className="w-main flex items-center justify-between text-xs text-white">
                <span>Đặt hàng online hoặc gọi ngày (+84) 919 615 222</span>
                {isLoggedIn ? (
                    <small className="text-[12px] flex gap-2 items-center text-sm">
                        <span>{`Xin chào, ${current?.firstname} ${current?.lastname}`}</span>
                        <span
                            onClick={() => dispatch(logout())}
                            className="hover:rounded-full hover:bg-gray-200 p-2 hover:text-main cursor-pointer"
                        >
                            <IoIosLogOut size={18} />
                        </span>
                    </small>
                ) : (
                    <Link className="hover:text-gray-800" to={`/${path.LOGIN}`}>
                        Đăng nhập hoặc đăng ký tài khoản
                    </Link>
                )}
            </div>
        </div>
    );
};

export default memo(TopHeader);
