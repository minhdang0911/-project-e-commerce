import React, { useState, useCallback } from 'react';
import InputField from '../../components/inputField';
import { Button } from '../../components';

const Login = () => {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = useCallback(() => {
        console.log(payload);
    }, [payload]);

    return (
        <div className="w-screen h-screen relative">
            <img
                src="https://wp-bn.salesforce.com/blog/wp-content/uploads/sites/2/2023/11/SF_Blog_Image_Ecommerce_Changing_Everything.png"
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center">
                    <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <InputField value={payload.name} setValue={setPayload} nameKey="name" />}

                    <InputField value={payload.email} setValue={setPayload} nameKey="email" />
                    <InputField value={payload.password} setValue={setPayload} nameKey="password" type="password" />
                    <Button name={isRegister ? 'Register' : 'Login'} handleOnClick={handleSubmit} fw />
                    <div className="flex items-center justify-between my-2 w-full text-sm">
                        {!isRegister && (
                            <span className="text-blue-500 hover:underline cursor-pointer">Forgot your account</span>
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
