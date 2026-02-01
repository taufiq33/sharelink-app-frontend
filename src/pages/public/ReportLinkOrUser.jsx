import Promotional from "@/components/public/Promotional";
import { CircleAlert } from "lucide-react";
import { useParams, useSearchParams, Link } from "react-router-dom";
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportingSchema } from "@/schemas/reportingSchema";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { getPublicLinkDetail, reportLink } from "@/features/links/api";

export default function ReportLinkOrUser() {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const [linkDetail, setLinkDetail] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function getLinkDetail(id) {
      try {
        const { data } = await getPublicLinkDetail(id);
        setLinkDetail(data.link);
      } catch (error) {
        console.log(error);
      }
    }

    if (searchParams.get("linkId")) {
      getLinkDetail(searchParams.get("linkId"));
    }
  }, [searchParams]);

  const reportForm = useForm({
    defaultValues: {
      message: "",
      reason: "",
    },
    resolver: zodResolver(reportingSchema),
  });

  async function onHandleSubmit(formData) {
    const submittedData = {
      type: linkDetail ? "link" : "user",

      userTarget: searchParams.get("userId"),

      reason: `${formData.reason}, ${formData.message} `,
    };

    if (searchParams.get("linkId")) {
      submittedData.linkTarget = searchParams.get("linkId");
    }

    try {
      const { data } = await reportLink(submittedData);
      setSuccessMessage(data.message);
    } catch (error) {
      console.log(error);
    }
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
            {successMessage
              ? "Thanks for your report. We will review this report and take action as soon as possible."
              : "Please complete this form before submit report."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Link className="text-center text-sm underline text-accent" to="/">
              Back to homepage.
            </Link>
          )}
          {!successMessage && (
            <form onSubmit={reportForm.handleSubmit(onHandleSubmit)}>
              <FieldSet>
                <Field>
                  <FieldLabel>Reporting Subject / Link</FieldLabel>

                  {linkDetail ? (
                    <>
                      <InputGroup className={"bg-secondary"}>
                        <InputGroupInput
                          disabled
                          value={`${username}'s Link: ${linkDetail.label} (${linkDetail.url})`}
                        />
                        <InputGroupAddon>
                          <User />
                        </InputGroupAddon>
                      </InputGroup>
                    </>
                  ) : (
                    <InputGroup className={"bg-secondary"}>
                      <InputGroupInput disabled value={`User: ${username}`} />
                      <InputGroupAddon>
                        <User />
                      </InputGroupAddon>
                    </InputGroup>
                  )}
                </Field>
                <Field>
                  <FieldLabel>Reason for report</FieldLabel>
                  <Controller
                    control={reportForm.control}
                    name="reason"
                    render={({ field }) => {
                      return (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Broken link">
                              Broken Link
                            </SelectItem>
                            <SelectItem value="Spam or misleading">
                              Spam or misleading
                            </SelectItem>
                            <SelectItem value="Inappropriate content">
                              Inappropriate content
                            </SelectItem>
                            <SelectItem value="Harassment or bullying">
                              Harassment or bullying
                            </SelectItem>
                            <SelectItem value="Hate speech">
                              Hate speech
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                  {reportForm.formState.errors?.reason && (
                    <FieldError>
                      {reportForm.formState.errors?.reason.message}
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Additional details (optional)</FieldLabel>
                  <Textarea
                    {...reportForm.register("message")}
                    placeholder="Please provide more information about the violation"
                  />
                  {reportForm.formState.errors?.message && (
                    <FieldError>
                      {reportForm.formState.errors?.message.message}
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
          )}
        </CardContent>
      </Card>
      <Promotional />
    </div>
  );
}
