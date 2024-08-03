"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";
import { useChangePassword } from "@/context/ChangePasswordContext";
import { SiTicktick } from "react-icons/si";
import { auth } from "@/app/firebase/firebase-cofig";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChangePasswordForm({ className, ...props }: UserAuthFormProps) {
  const { setIsChangePassword } = useChangePassword();
  const [inputs, setInputs] = React.useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const { email, currentPassword, newPassword } = inputs;

    if (email === "" || currentPassword === "" || newPassword === "") {
      toast({
        title: "Failed to change password",
        description: "Can't submit empty fields",
        variant: "default",
      });
      return;
    }

    try {
      setIsLoading(true);

      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is currently logged in.");
      }

      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(
        user.email || "",
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);

      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>Password changed successfully</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });

      setIsChangePassword(false);
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast({
        title: "Failed to change password",
        description: error.message || "An error occurred",
        variant: "default",
      });
    } finally {
      setInputs({
        email: "",
        currentPassword: "",
        newPassword: "",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Old Password
            </Label>
            <Input
              name="currentPassword"
              placeholder="******"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={inputs.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              New Password
            </Label>
            <Input
              name="newPassword"
              placeholder="******"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={inputs.newPassword}
              onChange={handleChange}
            />
          </div>
          <Button className="text-white font-semibold">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
}
