import React, { useState, useCallback, useEffect } from 'react';
import InputField from '../../components/inputField';
import { Button } from '../../components';
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from '../../utils/helper';

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

    const restPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: '',
        });
    };

    useEffect(() => {
        restPayload();
    }, [isRegister]);

    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;

        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        if (invalids === 0) {
            if (isRegister) {
                const response = await apiRegister(payload);

                if (response.success) {
                    Swal.fire('Congratulation', response?.mes, 'success').then(() => {
                        setIsRegister(false);
                        restPayload();
                    });
                } else {
                    Swal.fire('Oops', response?.mes, 'error');
                }
            } else {
                const result = await apiLogin(data);
                if (result.success) {
                    dispatch(login({ isLoggedIn: true, token: result.accessToken, userData: result.userData }));
                    navigate(`/${path.HOME}`);
                } else {
                    Swal.fire('Oops', result?.mes, 'error');
                }
            }
        }
    }, [payload, isRegister]);

    const [email, setEmail] = useState('');
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        if (response.success === true) {
            toast.success(response.mes);
        } else {
            toast.info(response.mes, { theme: 'colored' });
        }
    };

    return (
        <div className="w-screen h-screen relative">
            {isForgotPassword && (
                <div
                    className="animate-slide-right absolute top-0 left-0 bottom-0 right-0 bg-white
            flex py-8 z-50 flex-col items-center"
                >
                    <div className="flex flex-col gap-4">
                        <label htmlFor="email">Nhập vào email của bạn</label>
                        <input
                            type="text"
                            id="email"
                            className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
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
                <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center">
                    <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && (
                        <div className="flex items-center gap-2">
                            <InputField
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                value={payload.firstname}
                                setValue={setPayload}
                                nameKey="firstname"
                            />
                            <InputField
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                                value={payload.lastname}
                                setValue={setPayload}
                                nameKey="lastname"
                            />
                        </div>
                    )}

                    <InputField
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload.email}
                        setValue={setPayload}
                        nameKey="email"
                    />
                    {isRegister && (
                        <InputField
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey="mobile"
                        />
                    )}
                    <InputField
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload.password}
                        setValue={setPayload}
                        nameKey="password"
                        type="password"
                    />
                    <Button name={isRegister ? 'Register' : 'Login'} handleOnClick={handleSubmit} fw />
                    <div className="flex items-center justify-between my-2 w-full text-sm">
                        {!isRegister && (
                            <span
                                onClick={() => setIsForgotPassword(true)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                Forgot your account
                            </span>
                        )}

                        {!isRegister && (
                            <span
                                onClick={() => setIsRegister(true)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                Create account
                            </span>
                        )}

                        {isRegister && (
                            <span
                                onClick={() => setIsRegister(false)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                Go Login
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
