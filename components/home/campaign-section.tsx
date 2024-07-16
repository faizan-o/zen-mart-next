"use client";

import { getAllCampaigns } from "@/data/campaigns";
import { Campaign } from "@prisma/client";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const OnGoingCampaignsSection = () => {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);

  useEffect(() => {
    getAllCampaigns()
      .then((data) => setCampaigns(data))
      .catch((_) => setCampaigns(null));
  }, []);
  return (
    <div>
      <h1 className="font-bold text-3xl p-5">Ongoing Campaigns</h1>
      <Carousel
        plugins={[
          AutoPlay({
            delay: 2000,
          }),
        ]}
        className="mx-auto w-[90%] py-10"
      >
        <CarouselContent className="-ml-1">
          {campaigns &&
            campaigns.map((campaign) => (
              <CarouselItem className="w-full">
                <Link href={campaign.productOrCategoryUrl}>
                  <div className="w-full">
                    <Image
                      className="w-full object-center object-fit object-contain"
                      src={campaign.image}
                      width={4000}
                      height={4000}
                      alt={`${campaign.name} Image`}
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default OnGoingCampaignsSection;
