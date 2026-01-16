import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dummy = [
  {
    date: "2026-1-4",

    user: "Farah",
    details: "Spam",
    action: "Reported Link",
    id: 1,
  },
  {
    date: "2026-1-5",

    user: "Robert",
    details: "Spam",
    action: "Reported Link",
    id: 2,
  },
  {
    date: "2026-1-6",

    user: "Mulyono",
    details: "Broken link",
    action: "Reported User",
    id: 13,
  },
  {
    date: "2026-1-7",

    user: "Brob",
    details: "Broken link",
    action: "Reported Link",
    id: 14,
  },
  {
    date: "2026-1-8",

    user: "Fite",
    details: "Fraud/Scam",
    action: "Reported Link",
    id: 11,
  },
  {
    date: "2026-1-9",
    user: "Abr",
    details: "Fraud/Scam",
    action: "Reported Link",
    id: 9,
  },
];

export default function RecentReportTableCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Last 10 report from user</TableCaption>
          <TableHeader className={"bg-muted"}>
            <TableRow>
              <TableHead>USER</TableHead>
              <TableHead>ACTION</TableHead>
              <TableHead>DETAILS</TableHead>
              <TableHead>TIMESTAMPS</TableHead>
              <TableHead>Check</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummy.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.action}</TableCell>
                <TableCell>{item.details}</TableCell>
                <TableCell>{formatDateTime(item.date)}</TableCell>
                <TableCell>
                  <Button>Check</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
