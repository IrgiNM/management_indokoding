export type ReimbursementItemType = {
  id: number;
  reimbursement: number;
  reimbursement_detail: object;
  category: number;
  category_detail: CategoryDetailType;
  item_amount: string;
  created_at: string;
  updated_at: string;
}

export type ReimbursementDetailType = {
  id: number;
  user: number;
  user_detail: UserDetailType;
  title: string;
  total_amount: string;
  created_at: string;
  updated_at: string;
  description: string;
  image: string | null;
  status: string;
}

export type UserDetailType = {
  username: string;
  email: string;
}

export type CategoryDetailType = {
  id?: number;
  name: string;
  created_at?: string;
}
  