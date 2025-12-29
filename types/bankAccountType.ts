import { EmployeeType } from "./employeeType"

export type BankAccountType = {
    id?: number,
    employee?: number,
    employee_detail?: EmployeeType,
    bank_name: string,
    account_number: string,
    account_holder: string, 
    is_primary: boolean,
    created_at: string,
    updated_at: string
}

export type BankAccountSendType = {
    id?: number,
    bank_name?: string,
    account_number?: string,
    account_holder?: string, 
    is_primary?: boolean,
}