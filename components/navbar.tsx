"use client";

import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { NAVBAR_TITLE } from "@/constants/navbar";
import { Sidebar } from "./sidebar";

const Navbar = () => {
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
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
          <h1 className="font-bold text-3xl">{NAVBAR_TITLE}</h1>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
