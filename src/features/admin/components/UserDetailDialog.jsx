import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { EyeIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";
import { Info } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function UserDetailDialog({ userData }) {
  const [userDetailDialog, setUserDetailDialog] = useState(false);

  return (
    <Dialog
      open={userDetailDialog}
      onOpenChange={setUserDetailDialog}
      className=""
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Detail</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <Card className={"mt-4"}>
            <CardContent>
              <div>
                <div className="header-profile flex gap-2 flex-col justify-center items-center">
                  <Avatar className="w-35 h-35 rounded-full border-2 border-white shadow-lg">
                    <AvatarImage
                      src={`http://localhost:3300/public/photoProfile/${userData.username}`}
                    />
                    <AvatarFallback>
                      {userData.username} photo profile
                    </AvatarFallback>
                  </Avatar>
                  <p className=" text-xl font-black">{userData.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                  <Badge
                    variant={
                      userData.role !== "admin" ? "secondary" : "default"
                    }
                    className={"opacity-80"}
                  >
                    {" "}
                    <Verified /> {userData.role}
                  </Badge>
                </div>

                <hr className="my-3" />

                <div className="bio my-4">
                  <div className="flex gap-1 items-center">
                    <Info className="h-3 w-3" />
                    <h2 className="font-bold">SHORT BIO</h2>
                  </div>

                  <div className="p-4 bg-secondary/60 rounded border border-stone-100 mt-2">
                    <p className="text-xs">{userData.shortBio}</p>
                  </div>
                </div>

                <div className="grid-user-detail mt-2 flex flex-wrap ">
                  <div className="box p-3 flex-1/2 border rounded border-muted">
                    <h3 className=" text-xs">ACCOUNT STATUS</h3>
                    <span
                      className={`font-bold text-xs ${userData.active ? "text-green-500" : "text-destructive"}`}
                    >
                      {userData.active ? "Active" : "Not Active"}
                    </span>
                  </div>

                  <div className="box p-3 flex-1/2 border rounded border-muted">
                    <h3 className=" text-xs">MEMBER SINCE</h3>
                    <span className="font-bold text-xs">
                      {formatDateTime(userData.createdAt)}
                    </span>
                  </div>

                  <div className="box p-3 flex-1/2 border rounded border-muted">
                    <h3 className=" text-xs">TOTAL LINKS </h3>
                    <span className="font-bold text-xs">
                      {userData.linksTotal} Shared
                    </span>
                  </div>

                  <div className="box p-3 flex-1/2 border rounded border-muted">
                    <h3 className=" text-xs">LAST CHANGE</h3>
                    <span className="font-bold text-xs">
                      {formatDateTime(userData.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
