export type ReimburseType = {
    id: number;
    id_user: number;
    title: string;
    description: string;
    amount: number;
    date: string;
    status: string; // bisa dibatasi dengan union type
  };
  