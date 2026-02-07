import { useState, useEffect } from "react";
import { getAllReports } from "../api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useMemo } from "react";

import { Link } from "react-router-dom";

import { formatDateTime, getUserProfilePictureUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CustomBadge({ text }) {
  let variant = "secondary";
  if (text === "rejected") variant = "destructive";
  if (text === "done") variant = "default";
  return <Badge variant={variant}>{text}</Badge>;
}

export function ReasonText({ children }) {
  const [truncate, setTruncate] = useState(true);
  function handleClick() {
    setTruncate((prev) => !prev);
  }

  const longText = children.length > 40 ? true : false;
  return (
    <div className="max-w-[150px]">
      <p
        className={`italic text-sm  ${longText && truncate ? "truncate" : "text-wrap"}`}
      >
        {children}
      </p>{" "}
      {longText && (
        <Button onClick={handleClick} variant={"link"}>
          {truncate ? "more.." : "less.."}
        </Button>
      )}
    </div>
  );
}

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const form = useForm({
    defaultValues: {
      keyword: "",
      status: "allstatus",
    },
  });

  async function loadReports() {
    const { data } = await getAllReports();
    setReports(data.reports);
  }

  useEffect(() => {
    loadReports();
  }, []);

  const keyword = form.watch("keyword");

  const status = form.watch("status");

  let displayReports = useMemo(() => {
    return reports.filter((item) => {
      const reporter = item?.reporter?.username || "guest";
      const keywordMatch =
        !keyword ||
        item?.link?.link?.toLowerCase().includes(keyword.toLowerCase()) ||
        item?.link?.label?.toLowerCase().includes(keyword.toLowerCase()) ||
        item?.target?.username?.toLowerCase().includes(keyword.toLowerCase()) ||
        reporter.toLowerCase().includes(keyword.toLowerCase()) ||
        item.reason.toLowerCase().includes(keyword.toLowerCase());

      const statusMatch = status === "allstatus" || item.markReview === status;

      return keywordMatch && statusMatch;
    });
  }, [keyword, status, reports]);

  // async function handleFlagUser(type, id) {
  //   try {
  //     const { data } = await flagUser(type, id);
  //     toast.success(data.message);

  //     await loadUsers();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(JSON.stringify(error));
  //   }
  // }

  return (
    <div className="container p-2 ">
      <div className="title-heading flex flex-col md:flex-row  md:justify-between justify-center items-start gap-2 md:items-center">
        <div className="main-heading flex flex-col gap-4">
          <h2 className="text-2xl font-black">All Reports</h2>
          <p className="text-sm text-muted-foreground">
            Here's a list of all reports.
          </p>
        </div>
      </div>

      <div className="mt-4 max-w-11/12">
        <Card>
          <CardHeader>
            <CardTitle>ShareLink App Users's Reports.</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex gap-4">
              <InputGroup>
                <InputGroupInput
                  type="search"
                  placeholder="Search by reported item, reporter, or keyword...."
                  {...form.register("keyword")}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>

              <Controller
                name="status"
                control={form.control}
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>All Status</SelectLabel>
                          <SelectItem value="allstatus">All Status</SelectItem>
                          <SelectItem value="waiting">Waiting</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>

            <Table className={"mt-4"}>
              <TableHeader className={"bg-muted"}>
                <TableRow>
                  <TableHead>STATUS</TableHead>
                  <TableHead>REPORTED ITEM</TableHead>
                  <TableHead>REPORTER</TableHead>
                  <TableHead>REASON</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayReports.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <CustomBadge text={item.markReview} />
                    </TableCell>
                    {item.type === "user" && (
                      <TableCell
                        className={"flex justify-start items-center gap-2"}
                      >
                        <Avatar>
                          <AvatarImage
                            src={getUserProfilePictureUrl(item.target.username)}
                          />
                          <AvatarFallback>USERPHOTO</AvatarFallback>
                        </Avatar>
                        <span className="font-bold">
                          {item.target.username} (USER)
                        </span>
                      </TableCell>
                    )}
                    {item.type === "link" && (
                      <TableCell>
                        <div className="flex flex-col">
                          <h2 className="text-md font-bold">
                            {item.link.label}
                          </h2>
                          <a
                            className="text-xs text-blue-400 font-semibold hover:underline"
                            target="_blank"
                            href={item.link.link}
                          >
                            {item.link.link}
                          </a>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <Badge variant={item.reporter ? "outline" : "secondary"}>
                        {item.reporter ? item.reporter.username : "guest"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ReasonText>{item.reason}</ReasonText>
                    </TableCell>
                    <TableCell className={"text-xs"}>
                      {formatDateTime(item.createdAt)}
                    </TableCell>

                    <TableCell className={"flex gap-4"}>
                      <Link to={`/admin/reports/${item.id}`}>
                        <Button size="sm" variant={"outline"}>
                          Review Report
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
