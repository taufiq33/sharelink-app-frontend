import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useLoginForm from "../hooks/useLoginForm";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
  const { form, handleLogin } = useLoginForm();
  return (
    <FieldSet>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <FieldGroup>
          <Field data-invalid={form.formState.errors?.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              autoComplete="username"
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
              placeholder=""
              {...form.register("password")}
            />
            {form.formState.errors?.password && (
              <FieldError>{form.formState.errors.password.message}</FieldError>
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
              Login {form.formState.isSubmitting && <Spinner />}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
