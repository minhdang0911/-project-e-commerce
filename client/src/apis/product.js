import axios from '../axios';

export const apiGetProduct = (params) => {
    return axios({
        url: '/product/',
        method: 'get',
        params,
    });
};

export const apiGetProductByID = (pid) => {
    return axios({
        url: '/product/' + pid,
        method: 'get',
    });
};
