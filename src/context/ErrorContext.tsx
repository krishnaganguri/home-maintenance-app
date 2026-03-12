import React, {
    createContext,
    useContext,
    useState,
} from "react";

const ErrorContext = createContext<any>(null);

export function ErrorProvider({
  children,
}: any) {
  const [error, setError] = useState("");

  const showError = (message: string) => {
    setError(message);

    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <ErrorContext.Provider
      value={{
        error,
        showError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}