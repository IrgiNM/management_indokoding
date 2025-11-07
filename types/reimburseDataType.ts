// export type ReimburseType = {
//     id: number;
//     id_user: number;
//     title: string;
//     description: string;
//     amount: number;
//     date: string;
//     status: string; // bisa dibatasi dengan union type
//   };
  
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