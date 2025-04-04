import axios from 'axios';

const festivalApi = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-type': 'application/json',
    },
})

festivalApi.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

export default festivalApi;