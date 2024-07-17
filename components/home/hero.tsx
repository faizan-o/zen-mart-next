"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import { heroVRImage } from "@/public/export";
import Link from "next/link";
import { HERO } from "@/constants/home";

const HeroSection = () => {
  const user = useCurrentUser();

  return (
    <section
      className="flex flex-col
      justify-center items-center md:flex-row"
    >
      <div className="w-full md:w-1/2 md:px-10">
        <h1 className="text-3xl font-semibold text-center py-5 md:text-left md:w-[80%]">
          {HERO.heading}
        </h1>
        <p className="text-[14px] text-center sm:px-0 px-5  md:text-left text-gray-500">
          {HERO.paragraph}
        </p>
        <div className="mt-5 flex justify-center items-center space-x-5 md:block">
          <Link href="/categories/">
            <Button>{HERO.category_button}</Button>
          </Link>
          {!user && (
            <Link href="auth/login">
              <Button className="px-10">{HERO.login_button}</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 flex mt-20 md:mt-0 justify-center items-center">
        <Image src={heroVRImage} className="md:w-[55%]" alt="Hero VR Image" />
      </div>
    </section>
  );
};

export default HeroSection;
