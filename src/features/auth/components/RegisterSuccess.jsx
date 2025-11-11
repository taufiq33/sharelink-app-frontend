import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function RegisterSuccess({ user }) {
  return (
    <div
      key={user.id}
      className="flex justify-center items-center gap-6 flex-col"
    >
      <p>Your Account is ready to use. Log In to start share your links!</p>
      <Link to="/auth/login">
        {" "}
        <Button>Login</Button>
      </Link>
    </div>
  );
}
