import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useEffect } from "react";
import { fetchMe } from "../api";
import { Spinner } from "@/components/ui/spinner";

export default function PersonalInformationCard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await fetchMe();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, []);

  if (!user) return <Spinner />;
  return (
    <Card className={"w-full max-w-[650px] pb-0"}>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your photo and personal details.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className={"flex flex-col gap-4 justify-start "}>
        <div className="photo-profile flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-3">
          <img
            className="w-20 h-20 rounded-full mr-4"
            src={user.avatarUrl}
            alt=""
          />
          <Button size="sm">Change</Button>
          <Button size="sm" variant={"secondary"}>
            Remove
          </Button>
        </div>
        <div className="form-username-email mt-2">
          <FieldSet
            className={
              "flex-col sm:flex-row flex gap-4 justify-center items-center"
            }
          >
            <Field>
              <FieldLabel className="text-sm font-medium">Username</FieldLabel>
              <Input defaultValue={user.username} />
            </Field>
            <Field>
              <FieldLabel className="text-sm font-medium">Email</FieldLabel>
              <Input defaultValue={user.email} />
            </Field>
          </FieldSet>
        </div>
        <div className="form-username-email mt-2">
          <FieldSet>
            <Field>
              <FieldLabel className="text-sm font-medium">Short Bio</FieldLabel>
              <Textarea defaultValue={user.shortBio} />
            </Field>
          </FieldSet>
        </div>
      </CardContent>
      <CardFooter className={"bg-secondary flex justify-end p-4"}>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
