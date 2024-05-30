import axios from '../axios';

export const apiRegister = (data) => {
    return axios({
        url: '/user/register',
        method: 'post',
        data,
        withCredentials: true,
    });
};

export const apiLogin = (data) => {
    return axios({
        url: '/user/login',
        method: 'post',
        data,
    });
};

export const apiForgotPassword = (data) => {
    return axios({
        url: '/user/forgotpassword',
        method: 'post',
        data,
    });
};

export const apiResetPassword = (data) => {
    return axios({
        url: '/user/resetpassord',
        method: 'put',
        data,
    });
};
