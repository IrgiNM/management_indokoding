import { UserType } from "./userType";

export type SalarySlipType = {
    id: number;
    user_detail: UserType;
    user: number;
    year: number;
    month: number;
    gross_salary: string;
    bpjs_health: string;
    bpjs_employment: string;
    tax_amount: string;
    monthly_reimburse: string;
    overtime_pay: string;
    net_salary: string;
    created_at: string;
    finance: number;
  };