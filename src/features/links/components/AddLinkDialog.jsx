import { useState } from "react";
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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLinkSchema } from "../schemas/addLinkSchema";
import { PlusIcon } from "lucide-react";

export default function AddLinkDialog({ onHandleAddLink }) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const addLinkForm = useForm({
    resolver: zodResolver(addLinkSchema),
  });

  function handleSubmit(formData) {
    onHandleAddLink(formData);
    addLinkForm.reset();
    setAddDialogOpen(false);
  }

  return (
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
            New Link will be placed at the end of the list order, you can drag
            it to a specific order later.
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
          <form onSubmit={addLinkForm.handleSubmit(handleSubmit)}>
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
  );
}
