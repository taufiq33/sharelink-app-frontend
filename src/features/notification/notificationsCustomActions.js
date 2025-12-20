import { toast } from "sonner";
import { notificationsActions } from "./slices";
import {
  markAllNotificationAsRead,
  markNotificationAsRead,
  getNotificationsByUser,
} from "./api";

export function readNotification(id, silent = true) {
  return async function (dispatch) {
    try {
      const { data } = await markNotificationAsRead(id);
      if (!silent) {
        toast.success(data.message);
      }
      dispatch(notificationsActions.markAsRead(id));
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
      const { data } = await getNotificationsByUser();
      dispatch(notificationsActions.saveNotifications(data.notifications));
    }
  };
}

export function readAllNotification() {
  return async function (dispatch) {
    try {
      const { data } = await markAllNotificationAsRead();
      toast.success(data.message);
      dispatch(notificationsActions.markAsReadAll());
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
      const { data } = await getNotificationsByUser();
      dispatch(notificationsActions.saveNotifications(data.notifications));
    }
  };
}
