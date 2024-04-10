import { createContext } from "react";
import useFirebase from "../Hooks/useFirebaseAuth";

const AuthContext = createContext({
  user: {},
  isLoading: false,
  error: null,
  signInWithGoogle: () => {},
});

export const AuthProvider = ({ children }) => {
  const firebase = useFirebase();
  return (
    <AuthContext.Provider value={firebase}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
