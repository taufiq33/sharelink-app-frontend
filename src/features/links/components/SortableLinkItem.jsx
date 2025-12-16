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
import { CircleChevronUp } from "lucide-react";
import { CircleChevronDown } from "lucide-react";

export default function SortableLinkItem({
  item,
  onEditButtonClick,
  onHandleDeleteLink,
  onUpOrder,
  onDownOrder,
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
    >
      <div className="link-section flex items-center justify-around md:gap-4 gap-3 md:p-1">
        <GripVertical {...listeners} className="cursor-grab " />
        <div className="flex flex-col gap-2">
          <CircleChevronUp className="hover:scale-105" onClick={onUpOrder} />{" "}
          <CircleChevronDown
            className="hover:scale-105"
            onClick={onDownOrder}
          />
        </div>
        <span className="p-3 bg-secondary rounded-full hidden md:block">
          <Link />
        </span>

        <div className="flex md:flex-row flex-col justify-center md:items-center items-start gap-2">
          <div className="link-label">
            <h3 className="font-bold max-w-[150px] truncate block md:max-w-full">
              {item.label}
            </h3>
            <a
              className="text-muted-foreground text-sm max-w-[150px] truncate block md:max-w-full"
              href={item.link}
              target="_blank"
            >
              {item.link}
            </a>
          </div>
          <Button
            variant={"secondary"}
            className="rounded-lg p-1 text-xs max-w-fit max-h-fit"
            size="xs"
          >
            <ChartNoAxesColumn /> <b>{item.clickCount}</b> clicks
          </Button>
        </div>
      </div>
      <div className="action-section flex md:flex-row flex-col md:gap-4 gap-2 md:mr-4">
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
