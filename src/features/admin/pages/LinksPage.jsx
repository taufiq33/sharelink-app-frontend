import { useState, useEffect } from "react";
import { getAllLinks } from "../api";
import { deleteLink } from "@/features/links/api";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import { ArrowDownNarrowWide } from "lucide-react";

import { toast } from "sonner";

import { Trash } from "lucide-react";

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const form = useForm({
    defaultValues: {
      keyword: "",
      userId: "alluser",
    },
  });

  async function loadLinks() {
    const { data } = await getAllLinks();
    setLinks(data.data);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  const keyword = form.watch("keyword");
  const userId = form.watch("userId");

  let displayLinks = useMemo(() => {
    return links.filter((item) => {
      const keywordMatch =
        !keyword ||
        item.label.toLowerCase().includes(keyword.toLowerCase()) ||
        item.user.username.toLowerCase().includes(keyword.toLowerCase()) ||
        item.link.toLowerCase().includes(keyword.toLowerCase());

      const userMatch = userId === "alluser" || item.userId === userId;

      return keywordMatch && userMatch;
    });
  }, [keyword, userId, links]);

  let usersForFilterData = useMemo(() => {
    const data = new Map();

    links.forEach((item) => {
      data.set(item?.userId, item.user?.username);
    });

    return Array.from(data.entries()).map(([id, username]) => {
      return { id, username };
    });
  }, [links]);

  async function onDeleteLink(id) {
    try {
      const { data } = await deleteLink(id);
      toast.success(data.message);

      await loadLinks();
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  return (
    <div className="container p-2 ">
      <div className="title-heading flex flex-col md:flex-row  md:justify-between justify-center items-start gap-2 md:items-center">
        <div className="main-heading flex flex-col gap-4">
          <h2 className="text-2xl font-black">All Links</h2>
          <p className="text-sm text-muted-foreground">
            Here's a list of all links.
          </p>
        </div>
      </div>

      <div className="mt-4 max-w-9/10">
        <Card>
          <CardHeader>
            <CardTitle>ShareLink App Links.</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex gap-4">
              <InputGroup>
                <InputGroupInput
                  type="search"
                  placeholder="Search by user / label / link here...."
                  {...form.register("keyword")}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
              <Controller
                control={form.control}
                name="userId"
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>All User</SelectLabel>
                          <SelectItem value="alluser">All User</SelectItem>
                          {usersForFilterData.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.username}{" "}
                            </SelectItem>
                          ))}
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
                  <TableHead>LINK LABEL & URL</TableHead>
                  <TableHead>
                    {userId !== "alluser" ? (
                      <ArrowDownNarrowWide className="inline mr-1" />
                    ) : (
                      ""
                    )}
                    USER
                  </TableHead>
                  <TableHead>CLICKS</TableHead>
                  <TableHead>CREATED AT</TableHead>

                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayLinks.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <h2 className="text-md font-bold">{item.label}</h2>
                        <a
                          className="text-xs text-blue-400 font-semibold hover:underline"
                          target="_blank"
                          href={item.link}
                        >
                          {item.link}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>{item.user.username}</TableCell>
                    <TableCell className={"text-center"}>
                      <b>{item.clickCount}</b>
                    </TableCell>
                    <TableCell>{formatDateTime(item.createdAt)}</TableCell>

                    <TableCell className={"flex gap-4"}>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will delete <b>"{item.label}"</b> (
                              {item.link}) by <b>{item.user.username}</b>{" "}
                              permanently.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className={
                                "bg-destructive hover:bg-destructive/60"
                              }
                              onClick={() => {
                                onDeleteLink(item.id);
                              }}
                            >
                              Delete Link
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
