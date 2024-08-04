export type User = {
  id: number;
  email: string;
  token: string;
};

export type UserData = {
  email: string;
  password: string;
};

export type ResponseUser = {
  email: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  password: string;
};

export type ResponseUserData = {
  token: string;
  user: ResponseUser;
};

export type TCategory = {
  id: number;
  title: string;
  createdAt: string;
  transactions?: [];
};

export type TTransaction = {
  id: number;
  title: string;
  amount: number;
  type: string;
  createdAt: string;
  category: TCategory;
};
