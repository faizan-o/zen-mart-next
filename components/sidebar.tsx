import { FaUser } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { NAVBAR_BUTTONS, NAVBAR_LINKS, NAVBAR_TITLE } from "@/constants/navbar";
import LoginButton from "./auth/login-button";
import RegisterButton from "./auth/register-button";
import Link from "next/link";
import { Button } from "./ui/button";
import { MdDashboard } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import { toast } from "sonner";
import { signOutUser } from "@/server-actions/sign-out-user";
import { FiLogOut } from "react-icons/fi";
import { T_NAVBAR_LINK } from "@/types/constant-types";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import SearchProductInput from "./search-products-input/search-product-input";

export const Sidebar = () => {
  const isAdmin = useCurrentRole() === "ADMIN";
  const user = useCurrentUser();

  const LINK = ({ href, Icon, label, type }: T_NAVBAR_LINK) => {
    if (type === "PRIVATE") {
      if (!user) return;
    }

    return (
      <Link href={href}>
        <div className="flex items-center gap-5 rounded-md hover:bg-gray-700 py-4 pl-5">
          <div>
            <Icon />
          </div>
          <h1 className="font-regular">{label}</h1>
        </div>
      </Link>
    );
  };
  return (
    <>
      <SheetHeader className="mt-5">
        <SheetTitle className="text-[25px]">{NAVBAR_TITLE}</SheetTitle>
        <div className="flex items-center space-x-5 py-5">
          {user?.image ? (
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{`${user.name?.split(" ")[0]}${
                user.name?.split(" ")[1]
              }`}</AvatarFallback>
            </Avatar>
          ) : (
            <FaUser className="text-3xl" />
          )}
          <div className="flex flex-col">
            <h1 className="font-semibold">
              {user ? user.name : "Welcome, To Zenmart"}
            </h1>
            <p className="text-[12px] text-gray-400">
              {user ? user?.email : "Please Login To Purchase"}
            </p>
          </div>
        </div>
      </SheetHeader>
      <div className="w-full h-[2px] rounded-full bg-gray-800" />

      <div className="w-full py-4 px-2 max-w-[24rem]">
        <SearchProductInput />
      </div>
      <div className="w-full h-[2px] rounded-full bg-gray-800" />
      <div className="py-5">
        {NAVBAR_LINKS.map((nav_link, idx) => (
          <LINK key={idx} {...nav_link} />
        ))}
      </div>
      <div className="w-full h-[2px] rounded-full bg-gray-800" />
      {!user && (
        <div className="py-5 space-y-5">
          <LoginButton mode="redirect">{NAVBAR_BUTTONS.login}</LoginButton>
          <RegisterButton mode="redirect">
            {NAVBAR_BUTTONS.register}
          </RegisterButton>
        </div>
      )}
      {user && (
        <>
          {isAdmin && (
            <Link href="/admin/dashboard">
              <Button variant="secondary" className="mt-5 w-full space-x-1">
                <MdDashboard />
                <h1>{NAVBAR_BUTTONS.dashboard}</h1>
              </Button>
            </Link>
          )}
          <Link href="/settings">
            <Button variant="secondary" className="mt-5 w-full space-x-2">
              <BsFillGearFill />
              <h1>{NAVBAR_BUTTONS.settings}</h1>
            </Button>
          </Link>
          <Button
            onClick={async (_) => {
              toast("Logging You Out");
              await signOutUser();
              window.location.replace("auth/login");
              toast("You Are Logged Out");
            }}
            variant="secondary"
            className="mt-5 w-full space-x-2"
          >
            <FiLogOut />
            <h1>{NAVBAR_BUTTONS.logout}</h1>
          </Button>
        </>
      )}
    </>
  );
};
