import axios from 'axios';

const api = axios.create({
    baseURL: 'http://libhub-be.us-east-2.elasticbeanstalk.com',
});

export default api;
