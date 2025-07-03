import { createContext, useState } from "react";
import { getAuthToken } from "../lib/auth-token.util";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const token = getAuthToken();

  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

/* 
Expired token
"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTMwOTAxMDc3NSIsImlhdCI6MTc1MTU2MjI0OCwiZXhwIjoxNzUxNTY0MDQ4fQ.TQ0yu2vWJa4KNvByr_Qgx79AzXBSz2Eu_tC292ZKjkk"
*/
