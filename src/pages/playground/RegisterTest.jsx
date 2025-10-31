import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldLegend,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldDescription,
  FieldSeparator,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    email: z.email().nonempty(),
    username: z.string().nonempty("Please fill this field."),
    password: z
      .string()
      .min(8, { error: "password must be minimum 8 char." })
      .nonempty(),
    confirmationPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: "Confirmation password does not match.",
    path: ["confirmationPassword"],
  });

export default function RegisterTest() {
  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmationPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  function handleRegister(data) {
    console.log(data);
  }

  console.log(form.formState.errors);

  return (
    <div className="bg-secondary p-4">
      <Card className={"max-w-[450px] mx-auto"}>
        <CardContent>
          <FieldSet>
            <FieldLegend>Register Form</FieldLegend>
            <FieldDescription>Create new account.</FieldDescription>
            <FieldSeparator />
            <form onSubmit={form.handleSubmit((data) => handleRegister(data))}>
              <FieldGroup>
                <Field data-invalid={form.formState.errors?.email}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...form.register("email")}
                    type="email"
                    id="email"
                    placeholder="u@example.com"
                    autoComplete="email"
                  />
                  {form.formState.errors?.email && (
                    <FieldError>
                      {form.formState.errors?.email.message}
                    </FieldError>
                  )}
                </Field>
                <Field data-invalid={form.formState.errors?.username}>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    type="text"
                    id="username"
                    placeholder="type your username.."
                    autoComplete="username"
                    {...form.register("username")}
                  />
                  {form.formState.errors?.username && (
                    <FieldError>
                      {form.formState.errors?.username.message}
                    </FieldError>
                  )}
                </Field>
                <Field data-invalid={form.formState.errors?.password}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    type="password"
                    id="password"
                    placeholder="type your password.."
                    autoComplete="newPassword"
                    {...form.register("password")}
                  />
                  {form.formState.errors?.password && (
                    <FieldError>
                      {form.formState.errors?.password.message}
                    </FieldError>
                  )}
                </Field>
                <Field
                  data-invalid={form.formState.errors?.confirmationPassword}
                >
                  <FieldLabel htmlFor="confirmationPassword">
                    Confirmation Password
                  </FieldLabel>
                  <Input
                    type="password"
                    id="confirmationPassword"
                    placeholder="type again your password.."
                    autoComplete="newPassword"
                    {...form.register("confirmationPassword")}
                  />
                  {form.formState.errors?.confirmationPassword && (
                    <FieldError>
                      {form.formState.errors?.confirmationPassword.message}
                    </FieldError>
                  )}
                </Field>
                <Field>
                  <Button type="submit">Register</Button>
                </Field>
              </FieldGroup>
            </form>
          </FieldSet>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm ">
            Already have an account ?{" "}
            <Button className={"p-0 m-0"} variant="link" size="sm" asChild>
              <Link className="underline" to="">
                Login
              </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
