import React, { useState, useCallback, useEffect, useRef } from 'react';
import InputField from '../../components/inputs/inputField';
import { Button, Loading } from '../../components';
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import path from '../../utils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from '../../utils/helper';
import { showModal } from '../../store/app/appSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: '',
    });
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);
    const [token, setToken] = useState('');
    const [isVerifyEmail, setIsVerifyEmail] = useState(false);
    const [timer, setTimer] = useState(300);
    const intervalRef = useRef(null);
    const [email, setEmail] = useState('');

    const restPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: '',
        });
    };

    const [searchParams] = useSearchParams();

    useEffect(() => {
        restPayload();
    }, [isRegister]);

    useEffect(() => {
        if (isVerifyEmail) {
            startTimer();
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isVerifyEmail]);

    useEffect(() => {
        if (timer <= 0) {
            clearInterval(intervalRef.current);
        }
    }, [timer]);

    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        if (invalids === 0) {
            if (isRegister) {
                dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
                const response = await apiRegister(payload);
                dispatch(showModal({ isShowModal: false, modalChildren: null }));
                if (response.success) {
                    setIsVerifyEmail(true);
                } else {
                    Swal.fire('Oops', response?.mes, 'error');
                }
            } else {
                const result = await apiLogin(data);
                if (result.success) {
                    dispatch(login({ isLoggedIn: true, token: result.accessToken, userData: result.userData }));
                    searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`);
                } else {
                    Swal.fire('Oops', result?.mes, 'error');
                }
            }
        }
    }, [payload, isRegister]);

    const finalRegister = async () => {
        const response = await apiFinalRegister(token);
        if (response.success) {
            Swal.fire('Congratulation', response?.mes, 'success').then(() => {
                setIsRegister(false);
                restPayload();
            });
        } else {
            Swal.fire('Oops', response?.mes, 'error');
        }
        setIsVerifyEmail(false);
        setToken('');
    };

    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        if (response.success === true) {
            toast.success(response.mes);
        } else {
            toast.info(response.mes, { theme: 'colored' });
        }
    };

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <div className="w-screen h-screen relative flex flex-col items-center justify-center bg-gray-100">
            {isVerifyEmail && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white w-96 rounded-lg p-6 shadow-lg transform transition-transform duration-300 scale-95 hover:scale-100">
                        <h4 className="text-lg font-semibold mb-4">
                            Vui lòng kiểm tra mã code trong email của bạn. Hãy nhập mã code vào đây. Mã code sẽ hết hạn
                            sau 5 phút (<span id="timer">{formatTime(timer)}</span>).
                        </h4>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md outline-none mb-4"
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Nhập mã code"
                        />
                        <button
                            onClick={finalRegister}
                            type="button"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}
            {isForgotPassword && (
                <div className="animate-slide-right absolute top-0 left-0 bottom-0 right-0 bg-white flex py-8 z-30 flex-col items-center">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="email">Nhập vào email của bạn</label>
                        <input
                            type="text"
                            id="email"
                            className="w-full max-w-md pb-2 border-b outline-none placeholder:text-sm"
                            placeholder="Example:email@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex items-center justify-end gap-4 w-full">
                            <Button name="Xác nhận" handleOnClick={handleForgotPassword} />
                            <Button
                                name="Trở lại"
                                handleOnClick={() => setIsForgotPassword(false)}
                                style="px-4 py-2 rounded-md text-white bg-orange-500 text-semibold my-2"
                            />
                        </div>
                    </div>
                </div>
            )}
            <img
                src="https://wp-bn.salesforce.com/blog/wp-content/uploads/sites/2/2023/11/SF_Blog_Image_Ecommerce_Changing_Everything.png"
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="p-8 bg-white rounded-md w-full max-w-lg flex flex-col items-center">
                    <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h1>
                    {isRegister && (
                        <div className="flex flex-col md:flex-row md:gap-2 w-full">
                            <InputField
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                value={payload.firstname}
                                setValue={setPayload}
                                nameKey="firstname"
                                fullWidth
                            />
                            <InputField
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                value={payload.lastname}
                                setValue={setPayload}
                                nameKey="lastname"
                                fullWidth
                            />
                        </div>
                    )}
                    <InputField
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload.email}
                        setValue={setPayload}
                        nameKey="email"
                        fullWidth
                    />
                    {isRegister && (
                        <InputField
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey="mobile"
                            fullWidth
                        />
                    )}
                    <InputField
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload.password}
                        setValue={setPayload}
                        nameKey="password"
                        type="password"
                        fullWidth
                    />
                    <Button handleOnClick={handleSubmit} fw>
                        {isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    </Button>
                    <div className="flex items-center justify-between my-2 w-full text-sm">
                        {!isRegister && (
                            <span
                                onClick={() => setIsForgotPassword(true)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                Quên mật khẩu
                            </span>
                        )}
                        {!isRegister && (
                            <span
                                onClick={() => setIsRegister(true)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                Tạo tài khoản
                            </span>
                        )}
                        {isRegister && (
                            <span
                                onClick={() => setIsRegister(false)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                Đi đến đăng nhập
                            </span>
                        )}
                    </div>
                    <Link className="text-blue-500 text-sm hover:underline cursor-pointer" to={`/${path.HOME}`}>
                        Trở lại
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
