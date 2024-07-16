"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { CategoryRevenue } from "@/types";
import { getCategoryRevenue } from "@/data/analytics";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  productCount: {
    label: "Product Count",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MainChart() {
  const [chartData, setChartData] = useState<CategoryRevenue[] | null>(null);

  useEffect(() => {
    getCategoryRevenue().then((rev) => setChartData(rev));
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Category Products And Revenue</CardTitle>
        <CardDescription>{new Date().toDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData!}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="categoryName"
              tickLine={false}
              tickMargin={15}
              axisLine={false}
              tickFormatter={(value) => value.split(" ")[0]}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="space-y-2 w-40"
                />
              }
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar
              dataKey="productCount"
              fill="var(--color-productCount)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The Product Count And Revenue Of Each Category{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          See Category Revenue
        </div>
      </CardFooter>
    </Card>
  );
}
