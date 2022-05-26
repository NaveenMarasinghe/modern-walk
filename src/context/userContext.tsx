import React from "react";
import { User } from "../types/user";
import { UserCTXType } from "../types/contextTypes/userContext";

export const UserContext = React.createContext<UserCTXType | null>(null);

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const loginUser = (user: User) => {
    const newUser: User = {
      name: user.name,
      email: user.email,
    };
    setUser(newUser);
  };
  const logoutUser = () => {
    setUser(null);
  };

  const memoedValue = React.useMemo(
    () => ({
      user,
      loginUser,
      logoutUser,
    }),
    [user]
  );
  return (
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
