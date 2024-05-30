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
