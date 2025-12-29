import { loginType } from "@/types/loginType";
import { ReimbursementSendType } from "@/types/reimburseDataType";
import axios from 'axios';
import { getToken } from './tokenFunction';
import { FinanceManagementSendType } from "@/types/financeDataType";
import { siteSettingSendType } from "@/types/siteSettingType";
import { overtimeLogSendType } from "@/types/overtimeLogType";
import { EmployeeSendType } from "@/types/employeeType";
import { BankAccountSendType } from "@/types/bankAccountType";

export const BASEURL = process.env.EXPO_PUBLIC_API_URL+'/api/';
export const BASEURLIMAGE = process.env.EXPO_PUBLIC_API_URL;
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


// USER
export const login = (data: loginType) => api.post('login/', data);
export const getUserId = () => api.get('user/me');
export const getUserByEmail = (email: string) => api.get(`user/${email}/`);
export const DeleteUserByEmail = (email: string) => api.delete(`user/delete/${email}/`);
export const createUser = (data: object) => api.post('user/create', data);
export const getUserAll = () => api.get('users');
export const updateUser = (email: string, data: object) => api.patch(`user/update/${email}/`, data);

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

// REIMBURSE ITEM
export const getReimburseItemId = (id: number) => api.get(`item/${id}`);
export const createReimburseItem = (data: object) => api.post('item/create', data);

// CATEGORY
export const createCategory = (data: object) => api.post('category/create/', data);

// FINANCE MANAGEMENT
export const getFinanceDataByUser = (email: string) => api.get(`finance/user/${email}/`);
export const CreateFinanceDataByUser = (data: FinanceManagementSendType) => api.post(`finance/create/`, data);
export const UpdateFinanceDataByUser = (data: FinanceManagementSendType) => api.patch(`finance/update/`, data);

// SITE SETTING
export const createSiteSetting = (data: siteSettingSendType) => api.post('setting/create/', data);
export const updateSiteSetting = (data: siteSettingSendType) => api.patch(`setting/update/`, data);
export const deleteSiteSetting = (data: {category: string, key: string}) => api.delete(`setting/delete/`, {data});
export const getSiteSettingByCategoryAndKey = (category: string, key: string) => api.get(`settings/${category}/${key}/`);
export const getSiteSettingsByCategory = (category: string) => api.get(`settings/${category}/`);
export const getAllSiteSettings = () => api.get('settings/');

// OVERTIME LOG
export const getOvertimeLogAll = () => api.get('overtimelog/');
export const getOvertimeLogByUser = (email: string) => api.get(`overtimelog/${email}/`);
export const getOvertimeLogByUserThisMonth = (email: string) => api.get(`overtimelog/thisMonth/${email}/`);
export const getMyOvertimeLog = () => api.get(`overtimelog/me/`);
export const getMyOvertimeLogThisMonth = () => api.get(`overtimelog/thisMonth/me/`);
export const createOvertimeLog = (data: overtimeLogSendType) => api.post('overtime/create/', data);
export const updateOvertimeLog = (id: number,data: overtimeLogSendType) => api.patch(`overtime/update/${id}/`, data);
export const deleteOvertimeLog = (id: number) => api.delete(`overtime/delete/${id}/`);

// EMPLOYEE
export const createEmployeeByUser = (email: string, data: EmployeeSendType) => api.post(`employee/create/${email}/`, data);
export const updateEmployeeByUser = (email: string, data: EmployeeSendType) => api.patch(`employee/update/${email}/`, data);
export const getEmployeeByUser = (email: string) => api.get(`employee/get/${email}/`);
export const getMyEmployeeData = () => api.get('employee/me/');

// BANK ACCOUNT
export const getBankAccountAll = () => api.get('bankAccount/');
export const getMyBankAccount = () => api.get('bankAccount/me/');
export const getBankAccountByUser = (email: string) => api.get(`bankAccount/${email}/`);
export const createMyBankAccount = (data: BankAccountSendType) => api.post(`bankAccount/create/self/`, data);
export const createBankAccountByUser = (email: string, data: BankAccountSendType) => api.post(`bankAccount/create/${email}/`, data);
export const updateBankAccountByUser = (id: number, data: BankAccountSendType) => api.patch(`bankAccount/update/${id}/`, data);
export const deleteBankAccountByUser = (id: number) => api.delete(`bankAccount/delete/${id}/`);

// SLIP SALARY
export const getAllSlipSalary = () => api.get('slipSalary/');
export const createSlipSalaryByUser = (email: string) => api.post(`slipSalary/create/${email}/`)
export const deleteSlipSalaryByUser = (email: string) => api.delete(`slipSalary/delete/${email}/`)