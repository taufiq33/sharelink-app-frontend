import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChartNoAxesColumn } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { PenIcon } from "lucide-react";
import { Link } from "lucide-react";
import { GripVertical } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { addLink, getUserLinks } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLinkSchema } from "../schemas/addLinkSchema";
import { toast } from "sonner";

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const addLinkForm = useForm({
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
      addLinkForm.reset();
      setAddDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container p-2 max-w-[800px] w-full mx-auto">
      <div className="title-heading flex justify-between items-center">
        <div className="main-heading flex flex-col gap-4">
          <h2 className="text-2xl font-black">My Links</h2>
          <p className="text-sm text-muted-foreground">
            Manage and reorder your shared links below.
          </p>
        </div>
        <Dialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          className="addLinkDialog"
        >
          <DialogTrigger asChild>
            <Button>
              <PlusIcon /> Add New Link
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader className={"font-bold text-lg mb-5"}>
              <DialogTitle>Add new link</DialogTitle>
              <DialogDescription>
                New Link will be placed at the end of the list order, you can
                drag it to a specific order later.
                {addLinkForm.formState.errors?.root && (
                  <div>
                    <p className="text-destructive">
                      {addLinkForm.formState.errors?.root.message}
                    </p>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <div>
              <form onSubmit={addLinkForm.handleSubmit(handleAddLink)}>
                <FieldSet>
                  <Field>
                    <FieldLabel>Label</FieldLabel>
                    <Input
                      {...addLinkForm.register("label")}
                      placeholder="type a label for this link"
                    />
                    {addLinkForm.formState.errors?.label && (
                      <FieldError>
                        {addLinkForm.formState.errors?.label.message}
                      </FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel>Link</FieldLabel>
                    <Input
                      {...addLinkForm.register("link")}
                      placeholder="https://example.com"
                    />
                    {addLinkForm.formState.errors?.link && (
                      <FieldError>
                        {addLinkForm.formState.errors?.link.message}
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
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="draggable-links flex flex-col gap-4 p-1 mt-5">
        {links.map((item) => {
          return (
            <div
              key={item.id}
              className="draggable-link-item bg-white dark:bg-background flex justify-between items-center p-2 rounded-lg shadow-xl "
              draggable="true"
            >
              <div className="link-section flex items-center justify-around gap-4 p-1">
                <GripVertical className="cursor-grab" />
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
                <PenIcon className="scale-70" />
                <TrashIcon className="scale-70" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
