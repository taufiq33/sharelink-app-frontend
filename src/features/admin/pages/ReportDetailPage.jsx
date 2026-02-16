import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Calendar } from "lucide-react";
import { History } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Eye } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  flagReport,
  getReportDetail,
  flagDoneReportAndAction,
  warnUser,
} from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { getUserProfilePictureUrl, formatDateTime } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { UserIcon } from "lucide-react";
import { CustomBadge } from "./ReportsPage";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export function CustomCard({ title, icon, children }) {
  return (
    <div className="px-8 py-4 border-gray-400 shadow rounded-lg bg-card my-4">
      <div className="flex justify-start gap-2 items-center mb-4">
        {icon} <h2 className="font-semibold text-muted-foreground ">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function ReportDetailPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    data: null,
    relatedData: [],
  });
  const { id } = useParams();
  const warnForm = useForm();

  async function fetchDetail(id) {
    setLoading(true);
    const { data } = await getReportDetail(id);
    setReport({
      data: data.report,
      relatedData: data.relatedReport,
    });
    setLoading(false);
  }

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  async function markReport(mark) {
    try {
      const { data } = await flagReport(id, mark);
      toast.success(data.message);
      fetchDetail(id);
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  async function handleMarkDoneAction(type, actionId) {
    try {
      const { data } = await flagDoneReportAndAction(id, { type, actionId });
      toast.success(data.message);
      fetchDetail(id);
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  async function handleWarningSubmit(formData) {
    const title =
      report.data.type === "link"
        ? "Your Link got reported. Please review."
        : "Your profile got Reported. Please review";
    const redirectUrl =
      report.data.type === "link"
        ? `/dashboard/links?linkId=${report.data?.link.id}`
        : "";

    const payload = {
      userId: report.data.target.id,
      title,
      redirectUrl,
      ...formData,
    };

    try {
      const { data } = await warnUser(payload);

      toast.success(data.message);
      await markReport("done");
      fetchDetail(id);
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  }

  if (loading) return <Spinner />;
  return (
    <div className="flex gap-10 justify-between items-start">
      <div className="flex-6">
        <div className="flex justify-between items-center">
          <Button className={"bg-accent/70"}>
            <Link to="/admin/reports">
              <ArrowLeftCircleIcon className="inline" /> Back to Reports Lists.
            </Link>
          </Button>

          {report.data?.markReview === "waiting" && (
            <ButtonGroup>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={" bg-red-200 opacity-70"}
                  >
                    Skip / Reject Report
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure to skip / reject this report?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => markReport("rejected")}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <ButtonGroupSeparator />

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <CircleAlert />
                    Warn User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Warn User</DialogTitle>
                    <DialogDescription>
                      Review warning message. Report will be marked as 'done'
                      after submitting form.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={warnForm.handleSubmit(handleWarningSubmit)}>
                    <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                      <Textarea
                        {...warnForm.register("message")}
                        value={`Please review your link/profile. Make sure your link/profile does not violate our community standards \n \n Your link/profile got reported with this message : \n  "${report.data?.reason}"`}
                      />
                    </div>
                    <DialogFooter className={"mt-4"}>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Warn User</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <ButtonGroupSeparator />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"destructive"}
                    className={"hover: opacity-80"}
                  >
                    <TrashIcon className="inline" />{" "}
                    {report.data.type === "link" ? "Delete Link" : "Block User"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      This report will be marked as <b>Reviewed</b>. Are you
                      sure to{" "}
                      {report.data.type === "link"
                        ? "delete this link"
                        : `block this user`}
                      ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleMarkDoneAction(
                          report.data.type,
                          report.data.type === "link"
                            ? report.data.link.id
                            : report.data.target.id,
                        );
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ButtonGroup>
          )}
        </div>
        <CustomCard
          icon={<CircleAlert className="h-5 w-5" />}
          title={"REPORT OVERVIEW"}
        >
          <div className="flex gap-6 justify-evenly items-center">
            <div className="flex flex-col gap-2 justify-start items-center">
              <h3 className="text-muted-foreground text-xs">Status</h3>

              <CustomBadge text={report.data?.markReview} />
            </div>
            <div className="flex flex-col gap-2 justify-start items-center">
              <h3 className=" text-muted-foreground text-xs">Reporter</h3>
              <div className="flex gap-2 justify-center items-center text-sm">
                <Avatar className={"h-5 w-5"}>
                  <AvatarImage
                    src={getUserProfilePictureUrl(
                      report.data?.reporter?.username,
                    )}
                  />
                  <AvatarFallback>
                    {report.data?.reporter?.username || "guest"}
                  </AvatarFallback>
                </Avatar>
                <h3>{report.data?.reporter?.username || "guest"}</h3>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-start items-center">
              <h3 className="text-muted-foreground text-xs">Report Date</h3>
              <p className="font-bold text-sm">
                {formatDateTime(report?.data?.createdAt)}
              </p>
            </div>
          </div>
        </CustomCard>
        <CustomCard
          icon={<LinkIcon className="h-4 w-4 " />}
          title={"TARGET DETAIL"}
        >
          <div className="bg-muted flex gap-4 items-center rounded-lg mb-2">
            {report.data.type === "link" ? (
              <LinkIcon className="w-14 h-14 shadow bg-card p-3 rounded-xl text-blue-700 ml-6" />
            ) : (
              <UserIcon className="w-14 h-14 shadow bg-card p-3 rounded-xl text-blue-700 ml-6" />
            )}

            {report.data.type === "link" ? (
              <div className="bg-muted px-2 py-4">
                <h2 className="font-bold">
                  {report.data?.link?.label || "link deleted"}
                </h2>
                {report.data.link && (
                  <>
                    {" "}
                    <Link
                      target="_blank"
                      className="text-sm underline text-blue-700"
                      to={report.data?.link?.link}
                    >
                      {report.data?.link?.link}
                    </Link>
                    <div className="flex gap-4 text-sm my-2 italic">
                      <span>
                        <Eye className="inline w-4 h-4" />
                        {report.data?.link?.clickCount} clicks
                      </span>
                      <span>
                        <Calendar className="inline w-4 h-4" />{" "}
                        {formatDateTime(report.data.link?.createdAt)}
                      </span>

                      <div className="flex gap-2 justify-center items-center text-sm">
                        <Avatar className={"h-5 w-5"}>
                          <AvatarImage
                            src={getUserProfilePictureUrl(
                              report.data.target?.username,
                            )}
                          />
                          <AvatarFallback>
                            {report.data?.target?.username}
                          </AvatarFallback>
                        </Avatar>
                        <h3>{report.data?.target?.username}</h3>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-muted px-2 py-4">
                <div className="flex gap-2 justify-start items-center">
                  <Avatar className={"h-5 w-5"}>
                    <AvatarImage
                      src={getUserProfilePictureUrl(
                        report.data.target?.username,
                      )}
                    />
                    <AvatarFallback>
                      {report.data?.target?.username}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-bold">{report.data?.target?.username}</h2>
                </div>
                <div className="flex gap-4 text-sm my-2 italic">
                  <span>
                    <Calendar className="inline w-4 h-4" /> joined on{" "}
                    {formatDateTime(report.data.target?.createdAt)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CustomCard>

        <CustomCard
          icon={<MessageSquare className="h-4 w-4 " />}
          title={"REASON"}
        >
          <div className="bg-muted py-2 px-4 rounded mb-2 border-l-4 border-blue-800">
            <p className="italic leading-7 text-sm"> {report.data?.reason}</p>
          </div>
        </CustomCard>
      </div>
      <div className="flex-2">
        <CustomCard
          icon={<History className="h-4 w-4 " />}
          title={"RELATED REPORTS"}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            {report.relatedData
              .filter((item) => item.id !== report.data.id)
              .map((item) => {
                return (
                  <Link to={`/admin/reports/${item.id}`}>
                    <div
                      key={item.id}
                      className="hover:bg-accent hover:text-white bg-muted py-4 px-2 rounded mb-2 flex justify-between items-start gap-8"
                    >
                      <div className="">
                        <h4 className="text-xs font-bold mb-1">
                          {item.reason}
                        </h4>
                        <div className="gap-1 text-xs italic flex justify-center items-center">
                          <Calendar className="inline w-3 h-3" />{" "}
                          <span>{formatDateTime(item.createdAt)}</span>
                        </div>
                      </div>

                      <CustomBadge text={item?.markReview} />
                    </div>
                  </Link>
                );
              })}
          </div>
        </CustomCard>
      </div>
    </div>
  );
}
