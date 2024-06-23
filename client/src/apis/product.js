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

export const apiRatings = (data) => {
    return axios({
        url: '/product/ratings',
        method: 'put',
        data,
    });
};

export const apiCreateProduct = (data) => {
    return axios({
        url: '/product',
        method: 'post',
        data,
    });
};

export const apiUpdateProduct = (data, pid) => {
    return axios({
        url: '/product/' + pid,
        method: 'put',
        data,
    });
};

export const apiDeleteProduct = (pid) => {
    return axios({
        url: '/product/' + pid,
        method: 'delete',
    });
};

export const apiAddVarriant = (pid, data) => {
    if (typeof pid !== 'string') {
        throw new Error('Invalid pid');
    }

    return axios({
        url: `/product/varriants/${pid}`,
        method: 'put',
        data: data,
    });
};

export const apiCreateOrder = (data) => {
    return axios({
        url: '/order/',
        method: 'post',
        data,
    });
};
