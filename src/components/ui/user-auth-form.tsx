"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Icons } from "./icons";
import { useUser } from "@/context/AdminContext";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useUser();
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      if (inputs.email === "" || inputs.password === "") {
        toast({
          title: "Failed to login",
          description: "Can't submit empty fields",
          variant: "default",
        });
        return;
      }

      if (inputs.email !== "admin@admin.com" || inputs.password !== "admin") {
        toast({
          title: "Failed to login",
          description: "Invalid email or password",
          variant: "default",
        });
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsAdminLoggedIn(!isAdminLoggedIn);
        localStorage.setItem("isLogin", "true");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setInputs({
        email: "",
        password: "",
      });
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
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              name="password"
              placeholder="******"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading} className="text-white font-semibold">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue to Dashboard
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
}
