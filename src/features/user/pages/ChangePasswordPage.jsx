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

export default function ChangePasswordPage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <Card className={"w-full max-w-[650px] pb-0"}>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password here.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className={"flex flex-col gap-4 justify-start "}>
          <FieldSet>
            <Field>
              <FieldLabel>Current Password</FieldLabel>
              <Input />
            </Field>
            <Field>
              <FieldLabel>New Password</FieldLabel>
              <Input />
            </Field>
            <Field>
              <FieldLabel>Confirm New Password</FieldLabel>
              <Input />
            </Field>
          </FieldSet>
        </CardContent>
        <CardFooter className={"bg-secondary flex justify-end p-4"}>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
