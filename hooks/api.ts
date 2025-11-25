import { loginType } from "@/types/loginType";
import { ReimbursementSendType } from "@/types/reimburseDataType";
import axios from 'axios';
import { getToken } from './tokenFunction';

export const BASEURL = 'http://192.168.1.13:8000/api/';
export const BASEURLIMAGE = 'http://192.168.1.13:8000';
const year = new Date().getFullYear();

export const api = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
    headers: {
    //   'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': 'Bearer <token>'
    },
})

api.interceptors.request.use(
    async config => {
        const token = await getToken();
        if(token){
            config.headers.Authorization = `Token ${token}`;
            // console.log('Token added to request headers', token);
        }
        return config;
    },
    error => Promise.reject(error)
)

// REIMBURSEMENT
export const getReimburseAll = () => api.get('reimbursements/');
export const getReimburseId = (id: number) => api.get(`reimbursements/${id}`);
export const DeleteReimburseId = (id: number) => api.delete(`reimbursements/delete/${id}`);
export const getReimburseThisMonthAll = () => api.get('reimbursements/thisMonth/');
export const getReimburseUserByEmailThisMonth = (email: string) => api.get(`reimbursements/thisMonth/${email}/`);
export const getReimburseThisYearAll = () => api.get('reimbursements/thisYear/');
export const getReimburseThisYearAllPerUser = (email: string) => api.get(`reimbursements/thisYear/${email}/`);
export const getReimburseUser = async () => api.get(`reimbursements/user/?${'year=' + year}`);
export const getReimburseUserPerMonth = async (month: string) => api.get(`reimbursements/user/?${'year=' + year}&${'month=' + month}`);
export const createReimburse = (data: FormData | ReimbursementSendType) => api.post(`reimbursements/create/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
});
export const updateReimburse = (id: number, data: object) => api.patch(`reimbursements/update/${id}`, data);

// USER
export const login = (data: loginType) => api.post('login/', data);
export const getUserId = () => api.get('user/me');
export const getUserByEmail = (email: string) => api.get(`user/${email}/`);
export const DeleteUserByEmail = (email: string) => api.delete(`user/delete/${email}/`);
export const createUser = (data: object) => api.post('user/create', data);
export const getUserAll = () => api.get('users');
export const updateUser = (email: string, data: object) => api.patch(`user/update/${email}/`, data);

// REIMBURSE ITEM
export const getReimburseItemId = (id: number) => api.get(`item/${id}`);
export const createReimburseItem = (data: object) => api.post('item/create', data);

// CATEGORY
export const createCategory = (data: object) => api.post('category/create/', data);

// FINANCE MANAGEMENT
export const getFinanceDataByUser = (email: string) => api.get(`finance/user/${email}/`)

