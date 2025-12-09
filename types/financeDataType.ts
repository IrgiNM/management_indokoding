export type FinanceManagementType = {
    id?: number;
    user: number;
    base_salary: string;
    spouse_allowance: number;
    child_allowance: number;
    enable_bpjs_health: boolean;
    enable_bpjs_employment: boolean;
    bpjs_health_rate_percentage: number;
    bpjs_employment_rate_percentage: number;
    enable_tax: boolean;
    tax_rate_percentage: number;
    created_at?: string;
    updated_at?: string;
}
export type FinanceManagementSendType = {
    email: string;
    is_active?: boolean;
    base_salary?: number;
    spouse_allowance?: number;
    child_allowance?: number;
    enable_bpjs_health: boolean;
    enable_bpjs_employment: boolean;
    bpjs_health_rate_percentage?: number;
    bpjs_employment_rate_percentage?: number;
    enable_tax: boolean;
    tax_rate_percentage: number;
}