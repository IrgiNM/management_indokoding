export type FinanceManagementType = {
    id?: number;
    user: number;
    base_salary: number;
    spouse_allowance: number;
    child_allowance: number;
    bpjs_health_percentage: number;
    bpjs_employment_percentage: number;
    tax_amount: number;
    overtime_hours: number;
    receivable_amount: number;
    created_at?: string;
    updated_at?: string;
}
export type FinanceManagementSendType = {
    email: string; // user ID dari backend
    base_salary: number;
    spouse_allowance: number;
    child_allowance: number;
    bpjs_health_percentage: number;
    bpjs_employment_percentage: number;
    tax_amount: number;
    overtime_hours: number;
    receivable_amount: number;
    created_at?: string;
    updated_at?: string;
}