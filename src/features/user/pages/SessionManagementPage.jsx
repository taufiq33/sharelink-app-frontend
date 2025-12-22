import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
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
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { fetchSessions, revokeSession } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

function RevokeButton({ onAction }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Logout device
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will log out this device from your account. The device may stay
            active for a few minutes before losing access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={"bg-destructive hover:bg-destructive/80"}
            onClick={onAction}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function SessionManagementPage() {
  const [sessions, setSessions] = useState([]);
  async function getAllSession() {
    try {
      const { data } = await fetchSessions();
      setSessions(data.sessions);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllSession();
  }, []);

  async function handleRevokeSession(id) {
    try {
      const { message } = await revokeSession(id);
      toast(message, {
        description: "This device will lose access within a few minutes.",
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
      getAllSession();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h2 className="text-lg font-bold">Active Devices</h2>
      <p className="text-sm text-muted-foreground">
        You are logged in on these devices. If you see something you don’t
        recognize, you can log it out from here.
      </p>

      <div className="list-session bg-card mt-5">
        {sessions.map((item) => (
          <Item
            key={item.id}
            variant={`outline`}
            className={`${item.currentSession && "bg-accent/10"}`}
          >
            <ItemContent>
              <ItemTitle>
                {item.sessionLabel.browser} {item.sessionLabel.version} on{" "}
                {item.sessionLabel.os}
              </ItemTitle>
              <ItemDescription>
                {item.sessionLabel.deviceType} -{" "}
                {item.currentSession
                  ? "Current session"
                  : `Logged in on
                ${formatDateTime(item.createdAt)}`}
              </ItemDescription>
              {item.sessionLabel.os === "unknown" && (
                <div className="text-destructive">
                  <p className="font-medium">Unrecognized device</p>
                  <p className="text-sm">
                    We couldn’t identify this device clearly. If you don’t
                    recognize it, you can log out this session.
                  </p>
                </div>
              )}
            </ItemContent>
            <ItemActions>
              {!item.currentSession ? (
                <RevokeButton onAction={() => handleRevokeSession(item.id)} />
              ) : (
                <Button variant="outline" size="sm">
                  Current
                </Button>
              )}
            </ItemActions>
          </Item>
        ))}
      </div>
    </div>
  );
}
