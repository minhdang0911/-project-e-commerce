import axios from '../axios';

export const apiGetCategories = () => {
    return axios({
        url: '/prodcategory/',
        method: 'get',
    });
};
