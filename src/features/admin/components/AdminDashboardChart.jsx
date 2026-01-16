import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { get5LastAppStats } from "../api";

const chartConfig = {
  users: {
    label: "New User",
    color: "blue",
  },
  links: {
    label: "New Link",
    color: "green",
  },
  reports: {
    label: "Report",
    color: "red",
  },
};

export default function AdminDashboardChart() {
  const [appData, setAppData] = useState([]);
  useEffect(() => {
    async function loadData() {
      const { data } = await get5LastAppStats();
      setAppData(data.stats);
    }

    loadData();
  }, [setAppData]);
  return (
    <Card className={"max-w-[600px]"}>
      <CardHeader>
        <CardTitle>Share Link App growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={"min-h-[300px] w-full"}>
          <BarChart accessibilityLayer data={appData}>
            <CartesianGrid />
            <XAxis dataKey={"date"} tickMargin={10} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="users" fill={"var(--color-users)"} radius={4} />
            <Bar dataKey="links" fill={"var(--color-links)"} radius={4} />
            <Bar dataKey="reports" fill={"var(--color-reports)"} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
