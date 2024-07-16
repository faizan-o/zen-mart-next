"use client";

import { useEffect, useState, useTransition } from "react";
import { getAllUsers } from "@/data/user";
import Header from "../header";
import { ScrollArea } from "../../ui/scroll-area";
import UserComponent from "./user";
import { FetchedUser } from "@/types";

const UsersDashboard = () => {
  const [users, setUsers] = useState<FetchedUser[] | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {}
    };

    fetchUsers();
  }, [isPending]);

  return (
    <div className="overflow-y-hidden w-[90%] mx-auto">
      <div className="flex justify-between mt-5">
        <Header heading="User Data" hasButton={false} />
      </div>
      <ScrollArea className="mt-5">
        <div className="block w-full space-y-5">
          {users?.map((user) => (
            <UserComponent
              user={user}
              startTransition={startTransition}
              isPending={isPending}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UsersDashboard;
