import axios from 'axios'; 

const username = 'danielHaim';
const password = 'balink';

const instance = axios.create({
    baseURL:'http://localhost:5000/api',
    auth: {username, password}
})

const getCountries = () => instance.get(`/countries`);
const addSubscriber = (data) => instance.post(`/addSubscriber`, data);

export {getCountries, addSubscriber}