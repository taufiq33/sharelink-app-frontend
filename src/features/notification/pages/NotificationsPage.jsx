import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { formatDateTime } from "@/lib/utils";
import { Clock4 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BellOff } from "lucide-react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { readNotification } from "../notificationsCustomActions";
import AlertDialogReadAllConfirmation from "../components/AlertDialogReadAllConfirmation";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

export default function NotificationsPage() {
  const [searchParams] = useSearchParams();
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [detailNotificationDialogOpen, setDetailNotificationDialogOpen] =
    useState(false);

  const { items: notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );

  const dispatch = useDispatch();

  const handleAsRead = useCallback(
    (notificationId, silent = true) => {
      dispatch(readNotification(notificationId, silent));
    },
    [dispatch]
  );

  const handleSelectedNotificationOpen = useCallback(
    (id) => {
      const item = notifications.find((item) => item.id === id);
      if (!item) return;
      !item.isRead && handleAsRead(item.id);
      setSelectedNotificationId(id);
      setDetailNotificationDialogOpen(true);
    },
    [handleAsRead, notifications]
  );

  useEffect(() => {
    if (searchParams.get("id") && searchParams.get("id") !== "") {
      handleSelectedNotificationOpen(searchParams.get("id"));
    }
  }, [searchParams, handleSelectedNotificationOpen]);

  const selectedNotification = notifications.find(
    (item) => item.id === selectedNotificationId
  );

  return (
    <div className="container p-2 ">
      <div className="title-heading flex flex-col md:flex-row  md:justify-between justify-center items-start gap-2 md:items-center">
        <div className="main-heading flex flex-col gap-4">
          <h2 className="text-2xl font-black">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Here's a list of all your recent notifications.
          </p>
        </div>

        {unreadCount > 0 && <AlertDialogReadAllConfirmation />}
      </div>

      <div className="notification-lists flex gap-6 flex-col justify-center items-start mt-5 max-w-9/10 mx-auto">
        {notifications.length === 0 && (
          <div className="flex flex-col justify-center items-center max-w-300px mx-auto text-muted-foreground my-8">
            <BellOff className="h-9 w-9" />
            <p className="text-sm">You have no new notifications.</p>
            <p className="text-sm">Come back later to see your updates.</p>
          </div>
        )}
        {selectedNotification && (
          <Dialog
            open={detailNotificationDialogOpen}
            onOpenChange={setDetailNotificationDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedNotification.title}</DialogTitle>
                <DialogDescription>
                  {formatDateTime(selectedNotification.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <p>{selectedNotification.message}</p>
              <DialogFooter>
                {selectedNotification.redirectUrl && (
                  <Button>
                    <Link to={selectedNotification.redirectUrl}>
                      Check item
                    </Link>
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {notifications.map((item) => (
          <div
            className={`notification-item border-l-4  flex gap-4 justify-center items-center w-full ${
              item.isRead ? "bg-card/15" : "bg-card border-accent"
            } p-2 rounded-lg shadow hover:shadow-lg`}
            key={item.id}
          >
            <span className="bg-secondary w-fit h-fit block p-2 rounded-lg shadow">
              <Bell />
            </span>
            <div className="notification-content flex-2/4">
              <h3 className="font-bold underline">{item.title}</h3>
              <p className="text-accent/60 text-sm md:flex gap-1">
                <span className="max-w-[250px] truncate block">
                  {item.message}
                </span>
                <span className="text-foreground/50 ">
                  <Clock4 className="inline w-3 h-3 mx-1" />
                  {formatDateTime(item.createdAt)}
                </span>
              </p>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={() => {
                  handleSelectedNotificationOpen(item.id);
                }}
              >
                {" "}
                Detail
              </Button>

              {!item.isRead && (
                <Button
                  onClick={() => {
                    handleAsRead(item.id, false);
                  }}
                  variant={"link"}
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
