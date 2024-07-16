import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { makeAdmin } from "@/server-actions/make-admin";
import { FetchedUser } from "@/types";
import { User } from "@prisma/client";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { TransitionStartFunction } from "react";
import { FaUser } from "react-icons/fa6";

interface UserComponentProps {
  user: FetchedUser;
  startTransition: TransitionStartFunction;
  isPending: boolean;
}

const UserComponent = ({
  user,
  startTransition,
  isPending,
}: UserComponentProps) => {
  const makeUserAdmin = (userId: string, currentRole: string) => {
    startTransition(async () => {
      try {
        await makeAdmin(userId, currentRole);
      } catch (err) {}
    });
  };

  return (
    <Collapsible
      key={user.id}
      className="shadow-2xl py-10 border-[1px] border-white px-5 rounded-md"
    >
      <div className="w-full text-white flex items-center space-x-5 justify-between">
        <div className="flex items-center space-x-5">
          {user.image ? (
            <Image
              src={user.image}
              width={1920}
              height={1080}
              className="w-6 h-6 rounded-full"
              alt="User Image"
            />
          ) : (
            <FaUser />
          )}
          <h1 className="font-bold">{user.name}</h1>
        </div>
        <CollapsibleTrigger className="border-[1px] border-white p-1 rounded-md">
          <ChevronDownIcon />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="w-full flex flex-col space-y-5">
        <div className="flex justify-between mt-5">
          <h1 className="font-semibold">User ID</h1>
          <p>{user.id}</p>
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Email</h1>
          <p>{user.email}</p>
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Name</h1>
          <p>{user.name}</p>
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Email Verified</h1>
          <p>{user.emailVerified && user.emailVerified?.toDateString()}</p>
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Role</h1>
          <p>{user.role}</p>
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">TwoFactorAuthentication</h1>
          {user.isTwoFactorEnabled ? (
            <Badge className="text-white font-normal bg-green-600 px-4 py-1">
              YES
            </Badge>
          ) : (
            <Badge className="text-white font-normal bg-red-600 px-4 py-1">
              NO
            </Badge>
          )}
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Edit</h1>
          <Button
            disabled={isPending}
            type="button"
            onClick={async () => makeUserAdmin(user.id, user.role)}
          >
            {user.role === "ADMIN" ? "Make User" : "Make Admin"}
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default UserComponent;
