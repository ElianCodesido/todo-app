export type User = {
  id: number;
  email: string;
  createdAt: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
