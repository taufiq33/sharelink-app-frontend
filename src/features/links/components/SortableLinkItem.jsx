import { ChartNoAxesColumn } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { PenIcon } from "lucide-react";
import { Link } from "lucide-react";
import { GripVertical } from "lucide-react";
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
import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

export default function SortableLinkItem({
  item,
  onEditButtonClick,
  onHandleDeleteLink,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      key={item.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="draggable-link-item bg-white dark:bg-background flex justify-between items-center p-2 rounded-lg shadow-xl "
      draggable="true"
    >
      <div className="link-section flex items-center justify-around gap-4 p-1">
        <GripVertical {...listeners} className="cursor-grab" />
        <span className="p-3 bg-secondary rounded-full">
          <Link />
        </span>

        <div className="link-label">
          <h3 className="font-bold">{item.label}</h3>
          <a
            className="text-muted-foreground text-sm"
            href={item.link}
            target="_blank"
          >
            {item.link}
          </a>
        </div>
        <Button
          variant={"secondary"}
          className="rounded-lg p-1 text-xs"
          size="xs"
        >
          <ChartNoAxesColumn /> <b>{item.clickCount}</b> clicks
        </Button>
      </div>
      <div className="action-section flex gap-4 mr-4">
        <Button
          onClick={() => {
            onEditButtonClick(item.id);
          }}
          variant={"icon"}
        >
          <PenIcon />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="icon">
              <TrashIcon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete "
                {item.label}" ({item.link}) link.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onHandleDeleteLink(item.id)}
                className="bg-destructive hover:bg-destructive/70"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
