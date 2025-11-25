  export type ReimbursementType = {
  id?: number;
  user: number;
  title: string;
  user_detail?: {
    username: string;
    email: string;
    is_staff: boolean;
  };
  total_amount: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  image?: object | null;
};

export type ReimbursementSendType =  {
  title: string;
  total_amount: string;
  description: string;
  status: string;
  image?: UploadFile;
};
export type ReimbursementGetType =  {
  title: string;
  total_amount: string;
  description: string;
  status: string;
  image?: string;
  created_at: string;
};

export interface UploadFile {
  uri: string;
  name: string;
  type: string;
}
