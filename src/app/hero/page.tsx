import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";

const HeroPage = () => {
  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Hero" />
        <h1 className="flex items-center justify-center h-full text-black">
          Coming soon
        </h1>
      </div>
    </div>
  );
};

export default HeroPage;
