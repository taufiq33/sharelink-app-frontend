import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const dummy = [
  { date: "2026-1-4", users: 5, links: 12, reports: 1 },
  { date: "2026-1-5", users: 8, links: 20, reports: 0 },
  { date: "2026-1-6", users: 2, links: 9, reports: 3 },
  { date: "2026-1-7", users: 2, links: 1, reports: 0 },
  { date: "2026-1-8", users: 1, links: 19, reports: 1 },
  { date: "2026-1-9", users: 4, links: 22, reports: 1 },
];

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
  return (
    <Card className={"max-w-[600px]"}>
      <CardHeader>
        <CardTitle>Share Link App growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={"min-h-[300px] w-full"}>
          <BarChart accessibilityLayer data={dummy}>
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
