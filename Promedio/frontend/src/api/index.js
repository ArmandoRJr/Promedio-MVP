import axios from "axios";
const API_ENDPOINT = process.env.API_ENDPOINT || `http://localhost:${process.env.SERVER_PORT || 4000}`;

// make axios helper functions for get, post, put, delete, patch
export const get = (url, data) => {
    return axios.get(`${API_ENDPOINT}/api/${url}`, data);
}
export const post = (url, data) => {
    return axios.post(`${API_ENDPOINT}/api/${url}`, data);
}
export const put = (url, data) => {
    return axios.put(`${API_ENDPOINT}/api/${url}`, data);
}
export const del = (url, data) => {
    return axios.delete(`${API_ENDPOINT}/api/${url}`, data);
}
export const patch = (url, data) => {
    return axios.patch(`${API_ENDPOINT}/api/${url}`, data);
}
