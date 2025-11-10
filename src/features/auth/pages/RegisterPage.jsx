import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <Card className={"w-full max-w-[350px]"}>
      <CardHeader>
        <CardTitle className={"text-center"}>Create new Account</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className={"flex items-center justify-center"}>
        <p className="text-sm text-foreground/70">
          Already have an account?{" "}
          <Button className={"p-0 underline"} variant={"link"} asChild>
            <Link>Log In</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
