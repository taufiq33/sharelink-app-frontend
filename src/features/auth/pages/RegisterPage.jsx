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
import { useState } from "react";
import RegisterSuccess from "../components/RegisterSuccess";

export default function RegisterPage() {
  const [userData, setUserData] = useState(null);

  function successRegisterAction(payload) {
    setUserData(payload.user);
  }

  return (
    <Card className={"w-full max-w-[550px]"}>
      <CardHeader>
        <CardTitle className={"text-center"}>
          {userData ? `Welcome, ${userData.username}!` : "Create new Account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {userData ? (
          <RegisterSuccess user={userData} />
        ) : (
          <RegisterForm successAction={successRegisterAction} />
        )}
      </CardContent>
      <CardFooter className={"flex items-center justify-center"}>
        {!userData && (
          <p className="text-sm text-foreground/70">
            Already have an account?{" "}
            <Button className={"p-0 underline"} variant={"link"} asChild>
              <Link to="/auth/login">Log In</Link>
            </Button>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
