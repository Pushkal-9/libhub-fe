import axios from 'axios';

const api = axios.create({
    baseURL: 'https://libhub.us-east-2.elasticbeanstalk.com',
});

export default api;