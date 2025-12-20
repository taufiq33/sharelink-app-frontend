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

import { useDispatch } from "react-redux";
import { readAllNotification } from "../notificationsCustomActions";
import { Button } from "@/components/ui/button";

export default function AlertDialogReadAllConfirmation({
  variant = "button",
  props,
}) {
  const dispatch = useDispatch();
  async function handleAllAsRead() {
    dispatch(readAllNotification());
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} variant={variant}>
          {" "}
          Mark All as Read{" "}
        </Button>
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
  );
}
