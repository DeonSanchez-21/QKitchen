import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";

type ThemeContextType = AuthUser | null;

export const AuthContext = createContext<ThemeContextType>(null);

type AuthUser = {

}

type Props = {
  children?: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
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