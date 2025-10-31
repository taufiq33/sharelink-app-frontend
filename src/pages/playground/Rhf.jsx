import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullname: z.string().nonempty("Please fill this field."),
  email: z.email().nonempty("Please fill this field."),
  address: z.string().nonempty("Please fill this field."),
  username: z.string().min(5, { message: "minimum 5 char" }),
});

export default function Rhf() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      address: "",
      username: "",
    },
    resolver: zodResolver(schema),
  });

  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <div className="max-w-[650px] mx-auto p-2">
      <Card>
        <CardHeader>
          <CardTitle>Example form.</CardTitle>
          <CardDescription>Fill in this form.</CardDescription>
          <CardAction>Render Count {renderCount.current}</CardAction>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div className="my-4 p-2 flex flex-col gap-4">
              <Label htmlFor="fullname">Fullname</Label>
              <Input
                type="text"
                placeholder="your full name.."
                className={"bg-secondary"}
                autoComplete="name"
                id="fullname"
                {...register("fullname")}
              />
              {errors?.fullname && (
                <p className="text-destructive">{errors.fullname.message}</p>
              )}
            </div>
            <div className="my-4 p-2 flex flex-col gap-4">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                placeholder="username.."
                className={"bg-secondary"}
                autoComplete="name"
                id="username"
                {...register("username")}
              />
              {errors?.username && (
                <p className="text-destructive">{errors.username.message}</p>
              )}
            </div>
            <div className="my-4 p-2 flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="u@example.com"
                className={"bg-secondary"}
                autoComplete="email"
                id="email"
                {...register("email")}
              />
              {errors?.email && (
                <p className="text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="my-4 p-2 flex flex-col gap-4">
              <Label htmlFor="address">Address</Label>
              <Textarea
                placeholder="full address"
                className={"bg-secondary h-40"}
                autoComplete="address"
                id="address"
                {...register("address")}
              />
              {errors?.address && (
                <p className="text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="my-4 p-2 flex flex-col gap-2">
              <Button type="submit" variant={"default"}>
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
