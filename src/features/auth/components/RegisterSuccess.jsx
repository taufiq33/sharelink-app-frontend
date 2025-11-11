import { Button } from "@/components/ui/button";

export default function RegisterSuccess({ user }) {
  return (
    <div
      key={user.id}
      className="flex justify-center items-center gap-6 flex-col"
    >
      <p>Your Account is ready to use. Log In to start share your links!</p>
      <Button>Login</Button>
    </div>
  );
}
