"use client";

import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AdminContext";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { setIsAdminLoggedIn } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    router.replace("/admin");
    localStorage.removeItem("isLogin");
  };

  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Profile" />
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <h1 className="text-black text-lg">Welcome Admin</h1>
          <Button
            onClick={handleLogout}
            className="self-center text-white font-semibold"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
