"use server";

import { db } from "@/lib/db";
import { Campaign } from "@prisma/client";

export const getAllCampaigns = async (): Promise<Campaign[] | null> => {
  try {
    const campaigns = await db.campaign.findMany({});
    return campaigns;
  } catch (err) {
    return null;
  }
};
