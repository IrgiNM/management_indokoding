import { UserType } from "./userType";

export type overtimeLogType = {
    id?: number;
    user?: number;
    user_detail?: UserType;
    date: string;
    start_time: string;
    end_time: string;
    duration_hours: string;
    description?: string;
    status: string;
    paid_date?: string;
    created_at?: string;
    updated_at?: string;
}

export type overtimeLogSendType = {
    email?: string;
    date?: string;
    status?: string;
    start_time?: string;
    end_time?: string;
    description?: string;
}