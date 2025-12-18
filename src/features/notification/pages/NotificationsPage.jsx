import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
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
import { useState } from "react";
import { BellOff } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  getNotificationsByUser,
  markAllNotificationAsRead,
  markNotificationAsRead,
} from "../api";
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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  async function fetchNotifications() {
    try {
      const { data } = await getNotificationsByUser();
      setNotifications(data.notifications);
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  async function handleAsRead(notificationId, silent = true) {
    try {
      const { data } = await markNotificationAsRead(notificationId);
      if (!silent) {
        toast.success(data.message);
      }
      await fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  async function handleAllAsRead() {
    try {
      const { data } = await markAllNotificationAsRead();

      toast.success(data.message);

      await fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div className="container p-2 ">
      <div className="title-heading flex flex-col md:flex-row  md:justify-between justify-center items-start gap-2 md:items-center">
        <div className="main-heading flex flex-col gap-4">
          <h2 className="text-2xl font-black">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Here's a list of all your recent notifications.
          </p>
        </div>

        {notifications &&
          notifications.some((item) => item.isRead === false) && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button> Mark All as Read </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure to mark <b>all notifications</b> as read?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAllAsRead}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
      </div>

      <div className="notification-lists flex gap-6 flex-col justify-center items-start mt-5 max-w-9/10 mx-auto">
        {notifications.length === 0 && (
          <div className="flex flex-col justify-center items-center max-w-300px mx-auto text-muted-foreground my-8">
            <BellOff className="h-9 w-9" />
            <p className="text-sm">You have no new notifications.</p>
            <p className="text-sm">Come back later to see your updates.</p>
          </div>
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
              <p className="text-accent/60 text-sm">
                {item.message}{" "}
                <span className="text-foreground/50 ">
                  <Clock4 className="inline w-3 h-3 mx-1" />
                  {formatDateTime(item.createdAt)}
                </span>
              </p>
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild variant={"outline"}>
                  <Button onClick={() => handleAsRead(item.id)}> Detail</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                    <DialogDescription>
                      {formatDateTime(item.createdAt)}
                    </DialogDescription>
                  </DialogHeader>
                  <p>{item.message}</p>
                  <DialogFooter>
                    {item.redirectUrl && (
                      <Button>
                        <Link to={item.redirectUrl}>Check item</Link>
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
