﻿import axios from 'axios';

const getRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/product/products`)
            .then(results => {
                resolve(results.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const getProductType = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/producttype/producttypes`)
            .then(results => {
                resolve(results.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const postRequest = (product) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/product`, product)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};



const putRequest = (productId, updatedProduct) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`api/product/updateproduct/${productId}`, updatedProduct)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const deleteRequest = (productId) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`/api/product/deleteproduct/${productId}`)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest,
    getProductType
};
