import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Spinner } from "@/components/ui/spinner";

import useRegisterForm from "../hooks/useRegisterForm";

export default function RegisterForm() {
  const { form, handleRegister } = useRegisterForm();

  return (
    <FieldSet>
      <form onSubmit={form.handleSubmit(handleRegister)}>
        <FieldGroup>
          <Field data-invalid={form.formState.errors?.username}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              autoComplete="username"
              placeholder="Enter your username"
              type="username"
              {...form.register("username")}
            />
            <FieldDescription>Username must be 4-15 character</FieldDescription>
            {form.formState.errors?.username && (
              <FieldError>{form.formState.errors.username.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={form.formState.errors?.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              autoComplete="email"
              placeholder="u@example.com"
              type="email"
              {...form.register("email")}
            />
            {form.formState.errors?.email && (
              <FieldError>{form.formState.errors.email.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={form.formState.errors?.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              type={"password"}
              id="password"
              autoComplete="password"
              placeholder="Enter your password"
              {...form.register("password")}
            />
            <FieldDescription>
              Password must be 8 character minimum
            </FieldDescription>
            {form.formState.errors?.password && (
              <FieldError>{form.formState.errors.password.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={form.formState.errors?.confirmationPassword}>
            <FieldLabel htmlFor="confirmationPassword">
              Confirmation Password
            </FieldLabel>
            <Input
              type={"password"}
              id="confirmationPassword"
              autoComplete="password"
              placeholder="Enter your password again"
              {...form.register("confirmationPassword")}
            />
            {form.formState.errors?.confirmationPassword && (
              <FieldError>
                {form.formState.errors.confirmationPassword.message}
              </FieldError>
            )}
          </Field>
          {form.formState.errors?.root && (
            <Field className={"text-center"} data-invalid>
              <p>{form.formState.errors.root.message}</p>
            </Field>
          )}
          <Field>
            <Button
              disabled={form.formState.isSubmitting}
              className={"shadow-lg"}
              type="submit"
            >
              Sign Up {form.formState.isSubmitting && <Spinner />}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
