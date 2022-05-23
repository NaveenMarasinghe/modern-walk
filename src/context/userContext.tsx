import React, { useContext } from "react";
import { User, UserContextType } from "../@types/user.d";

export const UserContext = React.createContext<UserContextType>(
  {} as UserContextType
);

type Props = {
  children: React.ReactNode;
};

const initialUser: User = { name: "initial", email: "" };

export function UserProvider({ children }: Props) {
  const [user, setUser] = React.useState<User>();
  const loginUser = (user: User) => {
    const newUser: User = {
      name: user.name,
      email: user.email,
    };
    setUser(newUser);
  };
  const logoutUser = (user: User) => {
    setUser(initialUser);
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
}

export default function useUser() {
  return useContext(UserContext);
}
