"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CAROUSEL_CARDS } from "@/constants/home";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";

const PromiseSection = () => {
  return (
    <Carousel
      plugins={[
        AutoPlay({
          delay: 2000,
        }),
      ]}
      className="min-w-[60%] md:min-w-[70%] border-none w-full max-w-[60%] md:max-w-[70%] mx-auto"
    >
      <CarouselContent className="-ml-1">
        {CAROUSEL_CARDS.map((carouselCard, idx) => (
          <CarouselItem
            key={idx}
            className="pl-1 w-full h-[26rem] flex justify-center items-center"
          >
            <div className="p-1 h-full hidden md:block">
              <Card className="h-full">
                <CardContent className="w-full h-full flex flex-col items-center justify-around p-6">
                  <h1 className="font-bold text-xl text-center">
                    {carouselCard.heading}
                  </h1>
                  <p className="text-[12px] font-thin text-gray-600 text-center text-pretty">
                    {carouselCard.paragraph}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="">
              <Image src={carouselCard.image} alt="PromiseCard1" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default PromiseSection;

