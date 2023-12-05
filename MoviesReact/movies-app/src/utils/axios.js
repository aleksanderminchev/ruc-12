import axios from 'axios';
import {
    HOST_API_KEY
} from '../config-global';
import {
    useNavigate
} from 'react-router-dom';
// import localStorageAvailable from './localStorageAvailable';
// config

// ----------------------------------------------------------------------

/** creates a new instance of the Axios library with a specified configuration.
 * In this case, the configuration sets the baseURL property to HOST_API_KEY,
 * which is the base URL for all requests made using this Axios instance.
 */

const axiosInstance = axios.create({
    baseURL: HOST_API_KEY,
    withCredentials: true,
});

export const setSession = (accessToken) => {
    // If access token is not null
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('super_admin');
        sessionStorage.removeItem('super_admin');
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

/** adds a request interceptor to the Axios instance.
 * This interceptor is a function that will be executed for every HTTP request received by the Axios instance.
 * The function takes two arguments: request and error.
 * If the request is successful, it returns the request object.
 * It adds the market_id to the request object
 * If the request contains an error. It returns a rejected Promise with the error data or a default error message.
 */
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    async (error) => {
        console.log('test');
        return Promise.reject((error.response && error.response.data) || 'Something went wrong');
    }
);
/** adds a response interceptor to the Axios instance.
 * This interceptor is a function that will be executed for every HTTP response received by the Axios instance.
 * The function takes two arguments: response and error.
 * If the response is successful, it returns the response object.
 * If the response contains an error. If the error is a 401 authentication, we try to refresh the authentication token.
 * Otherwise it returns a rejected Promise with the error data or a default error message.
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const {
            status,
            config
        } = error.response;

        // If there is an authentication error, we try to refresh the access token.

        if (status === 404) {

            const navigate = useNavigate();
            navigate('/404')
        } else if (status === 200) {
            return axiosInstance.request(config);
        }
        return Promise.reject((error.response && error.response.data) || 'Something went wrong');
    }
);


// ----------------------------------------------------------------------

export default axiosInstance;