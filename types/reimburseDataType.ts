  export type ReimbursementType = {
  id?: number;
  user: number;
  title: string;
  total_amount: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  image?: string;
};

export type ReimbursementSendType = {
  title: string;
  total_amount: string;
  description: string;
  status: string;
};
