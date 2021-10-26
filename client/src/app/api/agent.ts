import axios, {AxiosResponse} from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('debuggy/bad-request'),
    get401Error: () => requests.get('debuggy/unauthorised'),
    get404Error: () => requests.get('debuggy/not-found'),
    get500rror: () => requests.get('debuggy/server-error'),
    getValidationError: () => requests.get('debuggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;