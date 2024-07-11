"use client";

import { useEffect, useState, useTransition } from "react";
import { getAllUsers } from "@/data/user";
import type { User } from "@prisma/client";
import { db } from "@/lib/db";
import { BsChevronContract } from "react-icons/bs";
import { Button } from "../ui/button";
import { FaUser } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Header from "../auth/header";
import { ScrollArea } from "../ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FetchedUsers } from "@/types/index";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { makeAdmin } from "@/server-actions/make-admin";
import { TabsTrigger } from "../ui/tabs";

const UsersDashboard = () => {
  const [users, setUsers] = useState<FetchedUsers[] | null>(null);

  const [isPending, startTransition] = useTransition();

  const tableHeaders: string[] = [
    "Image",
    "Name",
    "EmailVerified",
    "Role",
    "TwoFactorAuthentication",
    "Edit",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {}
    };

    fetchUsers();
  }, [isPending]);

  const makeUserAdmin = (userId: string, currentRole: string) => {
    startTransition(async () => {
      try {
        await makeAdmin(userId, currentRole);
      } catch (err) {}
    });
  };

  return (
    <div className="overflow-y-hidden w-[90%] mx-auto">
      <div className="flex justify-between mt-5">
        <h1 className="text-3xl font-bold ">User Data</h1>
      </div>
      <ScrollArea className="mt-5">
        <div className="block w-full space-y-5">
          {users?.map((user) => (
            <Collapsible
              key={user.id}
              className="shadow-2xl py-5 border-[1px] border-white px-5 rounded-md"
            >
              <div className="w-full text-white flex items-center space-x-5 justify-between">
                <div className="flex items-center space-x-5">
                  {user.image ? (
                    <Image src={user.image} alt="User Image" />
                  ) : (
                    <FaUser />
                  )}
                  <h1 className="">{user.name}</h1>
                </div>
                <CollapsibleTrigger className="border-[1px] border-white p-1 rounded-md">
                  <ChevronDownIcon />
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="w-full flex flex-col space-y-5 mt-5">
                <div className="flex justify-between">
                  <h1 className="font-semibold">User ID</h1>
                  <p>{user.id}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold">Name</h1>
                  <p>{user.name}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold">Email Verified</h1>
                  {user.emailVerified ? (
                    <Badge className="text-white font-normal bg-green-600 px-4 py-1">
                      YES
                    </Badge>
                  ) : (
                    <Badge className="text-white font-normal bg-red-600 px-4 py-1">
                      No
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold">Role</h1>
                  {user.role === "ADMIN" ? (
                    <Badge className="text-white font-normal bg-blue-600 px-4 py-1">
                      {user.role}
                    </Badge>
                  ) : (
                    <Badge className="text-white bg-cyan-600 font-normal px-4 py-1">
                      {user.role}
                    </Badge>
                  )}
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
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UsersDashboard;
