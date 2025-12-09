import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import changePasswordSchema from "../schemas/changePasswordSchema";
import { updatePassword } from "../api";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { username } = useSelector((state) => state.auth);

  async function handleChangePassword(data) {
    try {
      const update = await updatePassword(data);
      toast.success(update.message);
    } catch (error) {
      setError("root", { type: "manual", message: error.data.message });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <input
        type="text"
        name="username"
        autoComplete="username"
        defaultValue={username}
        readOnly
        hidden
        aria-hidden="true"
      />
      <div className="flex flex-col gap-5 items-center justify-center">
        <Card className={"w-full max-w-[650px] pb-0"}>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password here.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className={"flex flex-col gap-4 justify-start "}>
            <FieldSet>
              <Field data-invalid={errors?.oldPassword}>
                <FieldLabel>Current Password</FieldLabel>
                <Input
                  autoComplete="current-password"
                  type="password"
                  {...register("oldPassword")}
                />
                {errors?.oldPassword && (
                  <FieldError>{errors?.oldPassword.message}</FieldError>
                )}
              </Field>
              <Field data-invalid={errors?.newPassword}>
                <FieldLabel>New Password</FieldLabel>
                <Input
                  autoComplete="new-password"
                  type="password"
                  {...register("newPassword")}
                />
                {errors?.newPassword && (
                  <FieldError>{errors?.newPassword.message}</FieldError>
                )}
              </Field>
              <Field data-invalid={errors?.confirmationNewPassword}>
                <FieldLabel>Confirm New Password</FieldLabel>
                <Input
                  autoComplete="new-password"
                  type="password"
                  {...register("confirmationNewPassword")}
                />
                {errors?.confirmationNewPassword && (
                  <FieldError>
                    {errors?.confirmationNewPassword.message}
                  </FieldError>
                )}
              </Field>
            </FieldSet>
            {errors?.root && (
              <p className="my-5 text-destructive">{errors?.root.message}</p>
            )}
          </CardContent>
          <CardFooter className={"bg-secondary flex justify-end p-4"}>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
