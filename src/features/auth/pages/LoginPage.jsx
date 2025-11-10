import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Card className={"w-full max-w-[350px]"}>
      <CardHeader>
        <CardTitle>Log in to your account</CardTitle>
        <CardDescription>
          Welcome back! Please enter your details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                autoComplete="username"
                placeholder="u@example.com"
                type="email"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                type={"password"}
                id="password"
                autoComplete="password"
                placeholder=""
              />
            </Field>
            <Field>
              <Button>Login</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
      <CardFooter className={"flex items-center justify-center"}>
        <p className="text-sm text-foreground/70">
          Don't have an account?{" "}
          <Button className={"p-0 underline"} variant={"link"} asChild>
            <Link>Sign Up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
