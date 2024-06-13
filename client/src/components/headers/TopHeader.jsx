import React, { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import path from '../../utils/path';
import { getCurrent } from '../../store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../../utils/icons';
import { logout, clearMessage } from '../../store/user/userSlice';
import Swal from 'sweetalert2';

const TopHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { IoIosLogOut } = icons;
    const { isLoggedIn, current, mes } = useSelector((state) => state.user);

    useEffect(() => {
        if (mes) {
            Swal.fire('Oops', mes, 'info').then((result) => {
                if (result.isConfirmed) {
                    dispatch(clearMessage());
                    navigate(`/${path.LOGIN}`);
                }
            });
        }
    }, [mes, dispatch, navigate]);

    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrent());
        }, 300);
        return () => {
            clearTimeout(setTimeoutId);
        };
    }, [dispatch, isLoggedIn]);

    return (
        <div className="h-[30px] w-full bg-main flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-screen-xl flex items-center justify-between text-xs text-white">
                <span className="truncate">Đặt hàng online hoặc gọi ngay (+84) 919 615 222</span>
                {isLoggedIn && current ? (
                    <small className="text-[12px] flex gap-2 items-center text-sm">
                        <span className="hidden sm:inline">{`Xin chào, ${current?.firstname} ${current?.lastname}`}</span>
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
