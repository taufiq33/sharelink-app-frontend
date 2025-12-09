import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldSet, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { removePhotoProfile, updateProfile } from "../api";
import { Spinner } from "@/components/ui/spinner";
import ChangeProfilePhotos from "./ChangeProfilePhotos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import updateProfileSchema from "../schemas/UpdateProfileSchema";
import { toast } from "sonner";

export default function PersonalInformationCard({ user }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      email: user?.email,
      username: user?.username,
      shortBio: user?.shortBio,
    },
    resolver: zodResolver(updateProfileSchema.partial()),
  });

  async function handleUpdateProfile(data) {
    try {
      let submittedData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "photoProfile") {
          submittedData.append(key, data[key]);
        }
      });

      let apiProperty = {
        url: "/auth/register/nextStep",
        method: "POST",
      };

      if (data.photoProfile && data.photoProfile.length > 0) {
        submittedData.append("photoProfile", data.photoProfile?.[0]);
        apiProperty = {
          url: "/me",
          method: "PUT",
        };
      }

      console.log(submittedData);
      if (isRemoved) {
        await removePhotoProfile();
      }

      const { message } = await updateProfile(submittedData, apiProperty);

      toast.success(message);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePhotoRemoved() {
    setIsRemoved(true);
    setValue("photoProfile", []);
  }

  if (!user) return <Spinner />;
  return (
    <Card className={"w-full max-w-[650px] pb-0"}>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your photo and personal details.
        </CardDescription>
      </CardHeader>
      <Separator />
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <CardContent className={"flex flex-col gap-4 justify-start "}>
          <ChangeProfilePhotos
            isRemoved={isRemoved}
            handlePhotoRemoved={handlePhotoRemoved}
            zodControl={control}
            user={user}
          />
          {errors?.photoProfile?.message && (
            <p className="text-destructive font-bold">
              {errors?.photoProfile?.message}
            </p>
          )}
          <div className="form-username-email mt-2">
            <FieldSet
              className={
                "flex-col sm:flex-row flex gap-4 justify-center sm:items-start items-center"
              }
            >
              <Field data-invalid={errors?.username}>
                <FieldLabel className="text-sm font-medium">
                  Username
                </FieldLabel>
                <Input {...register("username")} defaultValue={user.username} />
                {errors?.username && (
                  <FieldError>{errors.username.message}</FieldError>
                )}
              </Field>
              <Field data-invalid={errors?.email}>
                <FieldLabel className="text-sm font-medium">Email</FieldLabel>
                <Input {...register("email")} defaultValue={user.email} />
                {errors?.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>
            </FieldSet>
          </div>
          <div className="form-username-email mt-2">
            <FieldSet>
              <Field data-invalid={errors?.shortBio}>
                <FieldLabel className="text-sm font-medium">
                  Short Bio
                </FieldLabel>
                <Textarea
                  {...register("shortBio")}
                  defaultValue={user.shortBio}
                />
                {errors?.shortBio && (
                  <FieldError>{errors.shortBio.message}</FieldError>
                )}
              </Field>
            </FieldSet>
          </div>
        </CardContent>
        <CardFooter className={"bg-secondary flex gap-4 justify-end p-4 mt-5"}>
          <Button
            variant=""
            className={"bg-accent"}
            onClick={() => window.location.reload()}
            type="reset"
          >
            Cancel Changes
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
