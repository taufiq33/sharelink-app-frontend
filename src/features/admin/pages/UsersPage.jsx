import { useState, useEffect } from "react";
import { flagUser, getAllUsers } from "../api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { BadgeCheckIcon } from "lucide-react";
import { UserLock } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useMemo } from "react";
import { ArrowDownNarrowWide } from "lucide-react";
import { UserCheck } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import UserDetailDialog from "../components/UserDetailDialog";

export default function UsersPage() {
  const currentUser = useSelector((state) => state.auth.username);
  const [users, setUsers] = useState([]);
  const form = useForm({
    defaultValues: {
      keyword: "",
      role: "allrole",
      status: "allstatus",
    },
  });

  async function loadUsers() {
    const { data } = await getAllUsers();
    setUsers(data.data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const keyword = form.watch("keyword");
  const role = form.watch("role");
  const status = form.watch("status");

  console.log(`role ${role} , status ${status}`);

  let displayUsers = useMemo(() => {
    return users.filter((user) => {
      const keywordMatch =
        !keyword ||
        user.email.toLowerCase().includes(keyword.toLowerCase()) ||
        user.username.toLowerCase().includes(keyword.toLowerCase());

      const roleMatch = role === "allrole" || user.role === role;

      const statusMatch =
        status === "allstatus" ||
        (user.active && status === "active") ||
        (status === "notactive" && !user.active);

      return keywordMatch && roleMatch && statusMatch;
    });
  }, [keyword, role, status, users]);

  async function handleFlagUser(type, id) {
    try {
      const { data } = await flagUser(type, id);
      toast.success(data.message);

      await loadUsers();
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  return (
    <div className="container p-2 ">
      <div className="title-heading flex flex-col md:flex-row  md:justify-between justify-center items-start gap-2 md:items-center">
        <div className="main-heading flex flex-col gap-4">
          <h2 className="text-2xl font-black">All Users</h2>
          <p className="text-sm text-muted-foreground">
            Here's a list of all users.
          </p>
        </div>
        <Button>Create new Admin</Button>
      </div>

      <div className="mt-4 max-w-9/10">
        <Card>
          <CardHeader>
            <CardTitle>ShareLink App Users.</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex gap-4">
              <InputGroup>
                <InputGroupInput
                  placeholder="Search by username / email here...."
                  {...form.register("keyword")}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
              <Controller
                control={form.control}
                name="role"
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>All Role</SelectLabel>
                          <SelectItem value="allrole">All Role</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />

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
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="notactive">Not Active</SelectItem>
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
                  <TableHead>USERNAME</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>
                    {role !== "allrole" ? (
                      <ArrowDownNarrowWide className="inline mr-1" />
                    ) : (
                      ""
                    )}
                    ROLE
                  </TableHead>
                  <TableHead>
                    {status !== "allstatus" ? (
                      <ArrowDownNarrowWide className="inline mr-1" />
                    ) : (
                      ""
                    )}
                    STATUS
                  </TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayUsers.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      {" "}
                      <Badge variant={item.role === "user" ? "secondary" : ""}>
                        {item.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.active ? (
                        <Badge
                          variant="secondary"
                          className="bg-green-500 text-white dark:bg-green-600"
                        >
                          <BadgeCheckIcon />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant={"destructive"}>Not Active</Badge>
                      )}
                    </TableCell>

                    <TableCell className={"flex gap-4"}>
                      <UserDetailDialog id={item.id} />
                      {item.username !== currentUser && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={item.active ? "destructive" : ""}>
                              {item.active ? <UserLock /> : <UserCheck />}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will make user <b>"{item.username}"</b> (
                                {item.email}){" "}
                                {item.active ? "blocked" : "active"}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  let type = item.active ? "block" : "active";
                                  handleFlagUser(type, item.id);
                                }}
                                className={
                                  item.active
                                    ? "bg-destructive hover:bg-destructive/80"
                                    : ""
                                }
                              >
                                {item.active ? "Block user" : "Activate user"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
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
