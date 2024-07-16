"use client";

import { useEffect, useState, useTransition } from "react";
import { Campaign, Category } from "@prisma/client";
import { getAllCategories } from "@/data/categories";
import { getAllProductsIdAndName } from "@/data/products";
import { ProductsWithIdAndName } from "@/types";
import { getAllCampaigns } from "@/data/campaigns";
import HeaderWithCreationDialog from "../header";
import NewCampaignForm from "./new-campaign-form";
import CategoryComponent from "../categories/category";
import CampaignComponent from "./campaign";

const CampaignsDashboard = () => {
  const [error, setError] = useState<string | undefined>();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [products, setProducts] = useState<ProductsWithIdAndName[] | null>(
    null
  );
  const [success, setSuccess] = useState<string | undefined>();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };

    const fetchProducts = async () => {
      const products = await getAllProductsIdAndName();
      setProducts(products);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaigns = await getAllCampaigns();
      setCampaigns(campaigns);
    };

    fetchCampaigns();
  }, [isSubmitPending]);

  return (
    <div className="w-full px-5">
      <HeaderWithCreationDialog
        heading="Campaigns"
        hasButton
        btnLabel="Add Campaign"
      >
        <NewCampaignForm
          setError={setError}
          setSuccess={setSuccess}
          startSubmitTransition={startSubmitTransition}
          categories={categories || []}
          products={products || []}
          error={error || ""}
          success={success || ""}
          isSubmitPending={isSubmitPending}
        />
      </HeaderWithCreationDialog>
      <div className="flex flex-col justify-between mt-5 space-y-5 py-5 rounded-md">
        {campaigns &&
          campaigns?.map((campaign) => (
            <CampaignComponent
              campaign={campaign}
              key={campaign.id}
              categories={categories!}
              products={products}
              startSubmitTransition={startSubmitTransition}
            />
          ))}
      </div>
    </div>
  );
};

export default CampaignsDashboard;
