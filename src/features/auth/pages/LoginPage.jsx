import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

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
        <LoginForm />
      </CardContent>
      <CardFooter className={"flex items-center justify-center"}>
        <p className="text-sm text-foreground/70">
          Don't have an account?{" "}
          <Button className={"p-0 underline"} variant={"link"} asChild>
            <Link to="/auth/register">Sign Up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
