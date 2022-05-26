import { User } from "../user";

export type UserCTXType = {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};
