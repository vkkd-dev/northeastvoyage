"use client";

import React, { createContext, useContext, useState } from "react";

interface ChangePasswordContextType {
  isChangePassword: boolean;
  setIsChangePassword: any;
}

const ChangePasswordContext = createContext<ChangePasswordContextType>({
  isChangePassword: false,
  setIsChangePassword: () => {},
});

export const useChangePassword = () => useContext(ChangePasswordContext);

export function ChangePasswordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChangePassword, setIsChangePassword] = useState(false);

  return (
    <ChangePasswordContext.Provider
      value={{ isChangePassword, setIsChangePassword }}
    >
      {children}
    </ChangePasswordContext.Provider>
  );
}
