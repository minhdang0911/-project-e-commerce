import React, { useState } from 'react';
import { Button } from '../../components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleResettPassword = async () => {
        const response = await apiResetPassword({ password, token });
        if (response.success === true) {
            toast.success(response.mes);
            navigate('/login');
        } else {
            toast.error(response.mes, { theme: 'colored' });
        }
    };
    return (
        <div
            className=" t absolute top-0 left-0 bottom-0 right-0 bg-white
            flex   py-8 z-50 flex-col items-center"
        >
            <div className="flex flex-col gap-4">
                <label htmlFor="email">Nhập vào mật khẩu của bạn</label>
                <input
                    type="text"
                    id="email"
                    className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
                    placeholder="Mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center justify-end gap-4 w-full">
                    <Button handleOnClick={handleResettPassword}>Xác nhận</Button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
