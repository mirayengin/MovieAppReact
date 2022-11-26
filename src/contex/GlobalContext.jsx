import React, { createContext, useEffect, useState } from "react";
import { loginStatus } from "../auth/firebase";

export const AuthContext = createContext();
//* with custom hook
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  console.log("contex: ",currentUser);

  useEffect(() => {
    loginStatus(setCurrentUser);
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
