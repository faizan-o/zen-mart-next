"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginButton from "./auth/login-button";
import Link from "next/link";
import { Button } from "./ui/button";
import RegisterButton from "./auth/register-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { FaHome, FaReceipt, FaShoppingCart, FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillGearFill, BsInfoCircleFill } from "react-icons/bs";
import { RiContactsBook3Fill, RiHeartAddFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { FiLogOut } from "react-icons/fi";
import { signOutUser } from "@/server-actions/sign-out-user";
import { useRouter } from "next/navigation";
import SearchProductInput from "./search-products-input/search-product-input";
import { toast } from "sonner";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const isAdmin = useCurrentRole() === "ADMIN";
  const user = useCurrentUser();
  const router = useRouter();

  return (
    <header className="py-5">
      <nav className="px-3 flex justify-between items-center">
        <div className="flex space-x-5 items-center">
          <div className="max-h-screen overflow-y-auto">
            <Sheet>
              <SheetTrigger asChild>
                <div className="text-xl hover:bg-gray-600 cursor-pointer p-3 rounded-full">
                  <GiHamburgerMenu />
                </div>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="max-h-screen min-w-[350px] w-full max-w-[400px] overflow-y-auto"
              >
                <SheetHeader className="mt-5">
                  <SheetTitle className="text-[25px]">ZenMart</SheetTitle>
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
                  <Link href="/">
                    <div className="flex items-center gap-5 rounded-md hover:bg-gray-700 py-4 pl-5">
                      <div>
                        <FaHome />
                      </div>
                      <h1 className="font-regular">Home</h1>
                    </div>
                  </Link>
                  <Link href="/categories/">
                    <div className="flex items-center gap-5 rounded-md hover:bg-gray-700 py-4 pl-5">
                      <div>
                        <BiSolidCategory />
                      </div>
                      <h1 className="font-regular">Categories</h1>
                    </div>
                  </Link>
                  {user && (
                    <>
                      <Link href="/cart">
                        <div className="flex items-center gap-5 rounded-md hover:bg-gray-700 py-4 pl-5">
                          <div>
                            <FaShoppingCart />
                          </div>
                          <h1 className="font-regular">Cart</h1>
                        </div>
                      </Link>
                      <Link href="/wishlist">
                        <div className="flex items-center gap-5 rounded-md hover:bg-gray-700 py-4 pl-5">
                          <div>
                            <RiHeartAddFill />
                          </div>
                          <h1 className="font-regular">Wishlist</h1>
                        </div>
                      </Link>
                      <Link href="/orders">
                        <div className="flex items-center gap-5 rounded-md hover:bg-gray-700 py-4 pl-5">
                          <div>
                            <FaReceipt />
                          </div>
                          <h1 className="font-regular">My Orders</h1>
                        </div>
                      </Link>
                    </>
                  )}
                  <Link href="/about">
                    <div className="flex items-center gap-5 rounded-md hover:bg-gray-700 py-4 pl-5">
                      <div>
                        <BsInfoCircleFill />
                      </div>
                      <h1 className="font-regular">About Us</h1>
                    </div>
                  </Link>
                  <Link href="/contact">
                    <div className="flex items-center gap-5 rounded-md hover:bg-gray-700 py-4 pl-5">
                      <div>
                        <RiContactsBook3Fill />
                      </div>
                      <h1 className="font-regular">Contact Us</h1>
                    </div>
                  </Link>
                </div>
                <div className="w-full h-[2px] rounded-full bg-gray-800" />
                {!user && (
                  <div className="py-5 space-y-5">
                    <LoginButton mode="redirect">LogIn</LoginButton>
                    <RegisterButton mode="redirect">Register</RegisterButton>
                  </div>
                )}
                {user && (
                  <>
                    {isAdmin && (
                      <Link href="/dashboard">
                        <Button
                          variant="secondary"
                          className="mt-5 w-full space-x-1"
                        >
                          <MdDashboard />
                          <h1>Dashboard</h1>
                        </Button>
                      </Link>
                    )}
                    <Link href="/settings">
                      <Button
                        variant="secondary"
                        className="mt-5 w-full space-x-2"
                      >
                        <BsFillGearFill />
                        <h1>Settings</h1>
                      </Button>
                    </Link>
                    <Button
                      onClick={async (_) => {
                        toast("Logging You Out");
                        await signOutUser();
                        window.location.replace("/");
                        toast("You Are Logged Out");
                      }}
                      variant="secondary"
                      className="mt-5 w-full space-x-2"
                    >
                      <FiLogOut />
                      <h1>Logout</h1>
                    </Button>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
          <h1 className="font-bold text-3xl">ZenMart</h1>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
