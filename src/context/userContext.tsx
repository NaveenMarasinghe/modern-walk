import React from "react";
import { User, UserContextType } from "../@types/user.d";

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | undefined>();
  const loginUser = (user: User) => {
    const newUser: User = {
      name: user.name,
      email: user.email,
    };
    setUser(newUser);
  };
  const logoutUser = (user: User) => {
    setUser(undefined);
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
  if (context === undefined) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
