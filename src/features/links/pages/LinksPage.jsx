import { Button } from "@/components/ui/button";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useEffect } from "react";
import { useState } from "react";
import { addLink, deleteLink, editLink, getUserLinks, saveOrder } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLinkSchema } from "../schemas/addLinkSchema";
import { toast } from "sonner";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableLinkItem from "../components/SortableLinkItem";
import AddLinkDialog from "../components/AddLinkDialog";

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const [orderChange, setOrderChange] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const touchSensor = useSensor(TouchSensor);
  const defaultSensor = useSensor(PointerSensor);

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const sensors = useSensors(isTouchDevice ? touchSensor : defaultSensor);

  const editLinkForm = useForm({
    resolver: zodResolver(addLinkSchema),
  });

  async function getLinks() {
    const { data } = await getUserLinks();
    setLinks(data.links);
  }

  useEffect(() => {
    getLinks();
  }, []);

  async function handleAddLink(formData) {
    try {
      const { data } = await addLink(formData);
      toast.success(data.message);

      await getLinks();
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  async function handleDeleteLink(linkId) {
    try {
      const { data } = await deleteLink(linkId);
      toast.success(data.message);

      await getLinks();
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  async function handleEditLink(linkData) {
    try {
      const { data } = await editLink(selectedEditId, linkData);
      toast.success(data.message);

      await getLinks();
      editLinkForm.reset();
      setEditDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  function handleEditButtonClick(id) {
    setSelectedEditId(id);
    editLinkForm.reset();
    setEditDialogOpen(true);
  }

  function hanldeDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLinks((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });

    setOrderChange(true);

    console.log("drag end");
  }

  async function handleSaveOrder() {
    try {
      const order = links.map((item) => item.id);
      const { data } = await saveOrder({ links: order });
      toast.success(data.message);
      setOrderChange(false);
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  function handleUpOrder(index) {
    if (index === 0) return;

    setLinks((items) => {
      return arrayMove(items, index, index - 1);
    });

    setOrderChange(true);
  }

  function handleDownOrder(index) {
    if (index === links.length - 1) return;

    setLinks((items) => {
      return arrayMove(items, index, index + 1);
    });

    setOrderChange(true);
  }

  return (
    <div className="container p-2 ">
      <div className="title-heading flex flex-col md:flex-row  md:justify-between justify-center items-start gap-2 md:items-center">
        <div className="main-heading flex flex-col gap-4">
          <h2 className="text-2xl font-black">My Links</h2>
          <p className="text-sm text-muted-foreground">
            Manage and reorder your shared links below. Drag or use up/down
            button to adjust the order position.
          </p>
        </div>

        <AddLinkDialog onHandleAddLink={handleAddLink} />
      </div>

      <Dialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        className="editLinkDialog"
      >
        <DialogContent>
          <DialogHeader className={"font-bold text-lg mb-5"}>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>
              {editLinkForm.formState.errors?.root && (
                <div>
                  <p className="text-destructive">
                    {editLinkForm.formState.errors?.root.message}
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div>
            {selectedEditId && (
              <form onSubmit={editLinkForm.handleSubmit(handleEditLink)}>
                <FieldSet>
                  <Field>
                    <FieldLabel>Label</FieldLabel>
                    <Input
                      {...editLinkForm.register("label")}
                      placeholder="type a label for this link"
                      defaultValue={
                        links.find((item) => item.id === selectedEditId).label
                      }
                    />
                    {editLinkForm.formState.errors?.label && (
                      <FieldError>
                        {editLinkForm.formState.errors?.label.message}
                      </FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel>Link</FieldLabel>
                    <Input
                      {...editLinkForm.register("link")}
                      placeholder="https://example.com"
                      defaultValue={
                        links.find((item) => item.id === selectedEditId).link
                      }
                    />
                    {editLinkForm.formState.errors?.link && (
                      <FieldError>
                        {editLinkForm.formState.errors?.link.message}
                      </FieldError>
                    )}
                  </Field>
                  <Field className={"flex items-end justify-end"}>
                    <Button className={"max-w-fit"} type="submit">
                      Save link
                    </Button>
                  </Field>
                </FieldSet>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="draggable-links flex flex-col gap-4 p-1 mt-5">
        {orderChange && (
          <div className="flex gap-2 mx-auto">
            <Button
              onClick={() => {
                getLinks();
                setOrderChange(false);
              }}
              className={"max-w-fit mx-auto bg-destructive"}
            >
              Cancel changes
            </Button>
            <Button onClick={handleSaveOrder} className={"max-w-fit "}>
              Save Order
            </Button>
          </div>
        )}
        <DndContext
          collisionDetection={isTouchDevice ? pointerWithin : closestCenter}
          onDragEnd={hanldeDragEnd}
          sensors={sensors}
        >
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={links.map((link) => link.id)}
          >
            {links.map((item, index) => (
              <SortableLinkItem
                key={item.id}
                item={item}
                onEditButtonClick={handleEditButtonClick}
                onHandleDeleteLink={handleDeleteLink}
                onUpOrder={() => handleUpOrder(index)}
                onDownOrder={() => handleDownOrder(index)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
