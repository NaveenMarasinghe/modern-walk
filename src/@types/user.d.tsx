export type User = {
  name: string;
  email: string;
};

export type UserContextType = {
  user: User | undefined;
  loginUser: (user: User) => void;
  logoutUser: (user: User) => void;
};
