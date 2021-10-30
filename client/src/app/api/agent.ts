import axios, {AxiosError, AxiosResponse} from "axios";
import { toast } from "react-toastify";
import { history } from "../..";  //This goes to index.tsx

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));
axios.defaults.baseURL = 'http://localhost:5000/api/';
// Add this to allow cookies from the API Server
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

//We need to choose if we want to intersept the request on the way out or the 
//response that we get on the way back from the API. We are intersted in the 
//response in this case
axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    // ! overrides type safety right here. It will turn off the type safety
    const {data, status} = error.response as any;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                //Explanation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: 'server-error',
                //Data is going to content the error response
                state: {error: data}
            });
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Basket = {
    get: () => requests.get('basket'),
    // Here I need to pass an empty object at the end because it is a post
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;