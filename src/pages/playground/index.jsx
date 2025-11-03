import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { Trash2Icon, ArrowRightIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

import { EyeIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { login } from "@/features/auth/api";
import { authActions } from "@/features/auth/slices";
import { useDispatch } from "react-redux";

const schema = z.object({
  email: z.email().nonempty("please fill this field"),
  password: z.string().nonempty("please fill this field"),
});

export default function Playground() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  function handleToggleDark() {
    document.documentElement.classList.toggle("dark");
  }
  async function handleSubmitLogin(data) {
    try {
      const submitLogin = await login(data.email, data.password);
      console.log(submitLogin);
      dispatch(
        authActions.saveLoginData({
          userId: submitLogin.data.user.id,
          username: submitLogin.data.user.username,
          email: submitLogin.data.user.email,
          role: submitLogin.data.user.role,
          accessToken: submitLogin.data.accessToken,
        })
      );
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: error.data.message,
      });
    }
  }
  return (
    <div className="p-2 w-9/12 mx-auto mb-10">
      <h1 className="text-3xl font-bold text-primary p-2">Playground page</h1>
      <Button onClick={handleToggleDark} variant={"outline"}>
        toggle dark mode
      </Button>
      <hr className="my-2" />

      <div>
        <h1 className="text-2xl font-bold text-primary p-2">Button Variant</h1>
        <hr className="my-2" />
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="link">Link</Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-primary p-2">Button Size</h1>
        <hr className="my-2" />
        <Button size="default">Default</Button>
        <Button size="sm">SM Button</Button>
        <Button size="lg">LG Button</Button>
        <Button size="icon">Icon Button</Button>
        <Button size="icon-sm">Icon Button SM</Button>
        <Button size="icon-lg">Icon Button LG</Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-primary p-2">
          Button with Icon
        </h1>
        <hr className="my-2" />
        <div className="flex gap-1">
          <Button>
            Login <ArrowRightIcon />
          </Button>
          <Button size={"sm"} variant={"destructive"}>
            <Trash2Icon />
            Delete Link
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2Icon />
          </Button>
          <Button variant="outline" size="icon">
            <Edit2 />
          </Button>
          <Button variant="secondary" disabled>
            <Spinner />
            Processing
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-primary p-2">Input</h1>
        <hr className="my-2" />
        <Input type={"email"} placeholder="your email" />
        <Input type="file" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-primary p-2">Card</h1>
        <hr className="my-2" />
        <h2 className="my-8 text-xl font-bold text-center">Sharelink App</h2>
        <form onSubmit={handleSubmit((data) => handleSubmitLogin(data))}>
          <Card className="w-full max-w-sm mx-auto">
            <CardHeader className={""}>
              <CardTitle className={"text-xl"}>
                Log in to your account.
              </CardTitle>
              <CardDescription>
                Welcome back! Please enter your details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 justify-center my-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="u@example.com"
                  className="bg-secondary"
                  autoComplete="email"
                />
                {errors?.email?.message && (
                  <p className="text-destructive font-bold">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 justify-center my-4">
                <Label htmlFor="password">Password</Label>
                <ButtonGroup className={"w-full"}>
                  <Input
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password")}
                    id="password"
                    className="bg-secondary"
                  />
                  <Button
                    type="button"
                    variant={"outline"}
                    aria-label="toggle-password"
                    className="bg-secondary"
                    size={"icon"}
                  >
                    <EyeIcon />
                  </Button>
                </ButtonGroup>
                {errors?.password?.message && (
                  <p className="text-destructive font-bold">
                    {errors?.password?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 justify-center mt-4 mb-2">
                {errors.root && (
                  <p className="text-destructive font-bold text-center">
                    {errors.root.message}
                  </p>
                )}
                <Button type="submit">Login</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="opacity-80 text-sm">
                Don't have an account?{" "}
                <Button
                  size="sm"
                  className={"p-0 m-0"}
                  asChild
                  variant={"link"}
                >
                  <Link className="underline">Sign up</Link>
                </Button>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-primary p-2">Dialog</h1>
        <hr className="my-2" />
        <Dialog>
          <DialogTrigger>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Links/User</DialogTitle>
              <DialogDescription>
                Please specify reason, and we will review your report.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="type your reason..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant={"destructive"}>
                Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
