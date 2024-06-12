"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: any;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  isAdminLoggedIn: false,
  setIsAdminLoggedIn: () => {},
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
    //   console.log("isLogin:", isLogin);
      setIsAdminLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{ isAdminLoggedIn, setIsAdminLoggedIn, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}
