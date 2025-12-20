import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { getNotificationsByUser } from "../api";
import { useSelector, useDispatch } from "react-redux";
import { notificationsActions } from "../slices";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRight } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertDialogReadAllConfirmation from "./AlertDialogReadAllConfirmation";

export default function NotificationBell() {
  const [bellOpen, setBellOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, unreadCount } = useSelector((state) => state.notifications);

  async function fetchNotifications(dispatchFn) {
    try {
      const { data } = await getNotificationsByUser();
      dispatchFn(notificationsActions.saveNotifications(data.notifications));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchNotifications(dispatch);

    const intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchNotifications(dispatch);
      }

      return () => {
        clearInterval(intervalId);
      };
    }, 30_000);
  }, [dispatch]);

  return (
    <>
      <Popover open={bellOpen} onOpenChange={setBellOpen}>
        <PopoverTrigger asChild>
          <Button variant={"icon"} className="relative md:scale-120">
            <Bell />

            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={"bg-background"}>
          <div className="notifications-popover flex gap-2 flex-col">
            <div className="notifications-popover-header flex justify-between items-center pb-4 border-b-2">
              <h3 className="font-bold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <AlertDialogReadAllConfirmation variant="link" />
              )}
            </div>

            <div className="contents">
              {items.slice(0, 4).map((item) => {
                return (
                  <div
                    className={`rounded-lg flex items-center justify-center gap-3 border-b p-2 relative cursor-pointer hover:bg-accent/30 ${
                      item.isRead ? "bg-card/15" : "bg-accent/30"
                    }`}
                    key={item.id}
                    onClick={() =>
                      navigate(`/dashboard/notifications?id=${item.id}`)
                    }
                  >
                    {!item.isRead && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
                    )}
                    <Bell className="flex-1/5" />
                    <div className="flex-4/5 flex flex-col gap-1">
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      <p className="text-muted-foreground text-sm max-w-[150px] truncate block ">
                        {item.message}
                      </p>
                      <span className="text-xs text-muted-foreground/80">
                        {formatDateTime(item.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="notifications-popover-footer text-center pt-4">
              <Button
                asChild
                variant={"link"}
                onClick={() => setBellOpen(false)}
              >
                <Link to="/dashboard/notifications">
                  View all notifications <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
