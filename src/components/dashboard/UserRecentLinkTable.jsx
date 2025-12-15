import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function UserRecentLinkTable({ data }) {
  return (
    <Card className={"w-full max-w-[800px] mx-auto"}>
      <CardHeader>
        <CardTitle className={"text-lg font-semibold"}>
          10 Recent Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className={"bg-secondary inset-shadow-sm"}>
            <TableRow>
              <TableHead className={"text-foreground/50 text-xs "}>
                LABEL
              </TableHead>
              <TableHead className={"text-foreground/50 text-xs "}>
                URL
              </TableHead>
              <TableHead className={"text-foreground/50 text-xs "}>
                CREATED
              </TableHead>
              <TableHead className={"text-foreground/50 text-xs "}>
                CLICKS
              </TableHead>
              <TableHead className={"text-foreground/50 text-xs "}>
                ACTIONS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className={"font-medium"}>{item.label}</TableCell>
                <TableCell className={"font-medium"}>{item.link}</TableCell>
                <TableCell className={"text-foreground/60"}>
                  {formatDateTime(item.createdAt)}
                </TableCell>
                <TableCell className={"text-foreground/60"}>
                  {item.clickCount}
                </TableCell>
                <TableCell className={"flex gap-2"}>
                  <Button
                    className={"text-primary"}
                    variant={"outline"}
                    size="icon-sm"
                  >
                    <Copy />
                  </Button>
                  <Button
                    className={"text-primary"}
                    variant={"outline"}
                    size="icon-sm"
                  >
                    <Edit2 />
                  </Button>
                  <Button variant={"destructive"} size="icon-sm">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className={"flex justify-center items-center"}>
        <Link to="/dashboard/links">
          <Button>See All Links</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
