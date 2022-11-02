import axios from "axios";
const API_ENDPOINT = process.env.API_ENDPOINT || `http://localhost:${process.env.SERVER_PORT || 4000}`;

const authUserString = localStorage.getItem(`authUser`) ? localStorage.getItem(`authUser`) : undefined;
const authUser = JSON.parse(authUserString);
const token = authUser && authUser.token ? authUser.token : undefined;

// make axios helper functions for get, post, put, delete, patch
export const get = (url) => {
    console.log(`This is a token!`, token);
    return axios.get(`${API_ENDPOINT}/api/${url}`, {
        headers: {
            Authorization: `${authUserString}`
        }
    });
}
export const post = (url, data) => {
    return axios.post(`${API_ENDPOINT}/api/${url}`, data, {
        headers: {
            Authorization: `${authUserString}`
        }
    });
}
export const put = (url, data) => {
    return axios.put(`${API_ENDPOINT}/api/${url}`, data, {
        headers: {
            Authorization: `${authUserString}`
        }
    });
}
export const del = (url, data) => {
    return axios.delete(`${API_ENDPOINT}/api/${url}`, {
        headers: {
            Authorization: `${authUserString}`
        }
    });
}
export const patch = (url, data) => {
    return axios.patch(`${API_ENDPOINT}/api/${url}`, data, {
        headers: {
            Authorization: `${authUserString}`
        }
    });
}
