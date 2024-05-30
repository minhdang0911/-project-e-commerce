import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FinalRegister = () => {
    const navigate = useNavigate();
    const { status } = useParams();
    useEffect(() => {
        if (status === 'failed')
            Swal.fire('Oops !', 'Đăng ký tài khoản thất bại', 'error').then(() => {
                navigate('/login');
            });
        if (status === 'success')
            Swal.fire('Chúc mừng !', 'Đăng ký tài khoản thành công', 'success').then(() => {
                navigate('/login');
            });
    }, []);
    return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default FinalRegister;
