import { useState, useEffect, createContext, useContext } from "react";

interface AuthContextData {
  login: boolean;
  signIn(username: string, password: string): boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [login, setLogin] = useState(false);

  function signIn(username: string, password: string): boolean {
    if (username == "admin" && password == "controle0122") {
      setLogin(true);
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
