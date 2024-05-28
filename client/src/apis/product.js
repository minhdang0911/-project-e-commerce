import axios from '../axios';

export const apiGetProduct = (params) => {
    return axios({
        url: '/product/',
        method: 'get',
        params,
    });
};
