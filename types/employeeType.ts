export type EmploymentStatus = "active" | "resigned" | "terminated" | "probation";
export type Gender = "male" | "female";

export type EmployeeType = {
  id?: number;
  user: number;
  employee_id: string;

  // Personal Information
  full_name: string;
  gender: Gender;
  birth_date: string | null;
  tax_number?: string | null;
  identity_number?: string | null;

  // Contact
  phone_number?: string | null;
  email?: string | null;
  address?: string | null;

  // Job Information
  position: string;
  department: string;
  join_date: string;
  resign_date?: string | null;
  employment_status: EmploymentStatus;

  // Emergency Contact
  emergency_name?: string | null;
  emergency_phone?: string | null;
  emergency_relation?: string | null;

  // Timestamps
  created_at?: string;
  updated_at?: string;
}

export type EmployeeSendType = {
  employee_id?: string;
  full_name?: string;
  gender?: string;
  birth_date?: string;
  tax_number?: string;
  identity_number?: string;
  phone_number?: string;
  address?: string;
  employment_status?: string;
  position?: string;
  department?: string;
  join_date?: string;
  resign_date?: string;
  emergency_name?: string;
  emergency_phone?: string;
  emergency_relation?: string;
}