import Promotional from "@/components/public/Promotional";
import { CircleAlert } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportingSchema } from "@/schemas/reportingSchema";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

export default function ReportLinkOrUser() {
  const { username } = useParams();
  const reportForm = useForm({
    defaultValues: {
      type: "user",
      userReporter: "",
      userTarget: username,
      linkTarget: "",
      reason: "",
    },
    resolver: zodResolver(reportingSchema),
  });

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="heading-report flex flex-col gap-4 justify-center items-center my-5">
        <span className="block p-3 rounded-full bg-destructive/20">
          <CircleAlert className="text-destructive scale-125" />
        </span>
        <h1 className="font-bold text-xl">Report Violation</h1>
        <p className="text-muted-foreground text-sm">
          Help us keep our community safe by reporting inappropriate content.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Report User/Link </CardTitle>
          <CardDescription>
            Please complete this form before submit report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={reportForm.handleSubmit(handleSubmit)}>
            <FieldSet>
              <Field>
                <FieldLabel>Reporting Subject / Link</FieldLabel>

                <InputGroup className={"bg-secondary"}>
                  <InputGroupInput value={`User: ${username}`} />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                <Input hidden {...reportForm.register("userTarget")} />
              </Field>
              <Field>
                <FieldLabel>Reason for report</FieldLabel>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Broken link">Broken Link</SelectItem>
                    <SelectItem value="Spam or misleading">
                      Spam or misleading
                    </SelectItem>
                    <SelectItem value="Inappropriate content">
                      Inappropriate content
                    </SelectItem>
                    <SelectItem value="Harassment or bullying">
                      Harassment or bullying
                    </SelectItem>
                    <SelectItem value="Hate speech">Hate speech</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {reportForm.formState.errors?.type && (
                  <FieldError>
                    {reportForm.formState.errors?.type.message}
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Additional details</FieldLabel>
                <Textarea
                  {...reportForm.register("reason")}
                  placeholder="Please provide more information about the violation"
                />
                {reportForm.formState.errors?.reason && (
                  <FieldError>
                    {reportForm.formState.errors?.reason.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel>Your Email</FieldLabel>
                <Input
                  placeholder="email@example.com"
                  {...reportForm.register("userReporter")}
                />
                {reportForm.formState.errors?.userReporter && (
                  <FieldError>
                    {reportForm.formState.errors?.userReporter.message}
                  </FieldError>
                )}
              </Field>
              <Field className={"flex items-end justify-end"}>
                <Button className={"max-w-fit"} type="submit">
                  Submit Report
                </Button>
              </Field>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
      <Promotional />
    </div>
  );
}
