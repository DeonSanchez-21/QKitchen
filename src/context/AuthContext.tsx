import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";

type ThemeContextType = AuthUser | null;

export const AuthContext = createContext<ThemeContextType>(null);

type AuthUser = {

}

export const AuthContextProvider = ({ children }: React.ReactNode) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};