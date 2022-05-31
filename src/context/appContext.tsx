import React from "react";

type Props = {
  children: React.ReactNode;
};

type AppCTXType = {
  alertMessage: string | null;
  openAlert: (alert: string) => void;
  closeAlert: () => void;
};

export const AppContext = React.createContext<AppCTXType | null>(null);

const AppProvider = ({ children }: Props) => {
  const [alertMessage, setAlert] = React.useState<string | null>(null);

  const openAlert = (alert: string) => {
    setAlert(alert);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const memoedValue = React.useMemo(
    () => ({
      alertMessage,
      openAlert,
      closeAlert,
    }),
    [alertMessage]
  );
  return (
    <AppContext.Provider value={memoedValue}>{children}</AppContext.Provider>
  );
};

const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return context;
};

export { AppProvider, useApp };
