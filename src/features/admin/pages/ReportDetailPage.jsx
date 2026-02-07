import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { History } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Eye } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getReportDetail } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { getUserProfilePictureUrl, formatDateTime } from "@/lib/utils";

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
  const [report, setReport] = useState({
    data: null,
    relatedData: [],
  });
  const { id } = useParams();

  useEffect(() => {
    async function fetchDetail(id) {
      const { data } = await getReportDetail(id);
      setReport({
        data: data.report,
        relatedData: data.relatedReport,
      });
    }

    fetchDetail(id);
  }, [id]);
  return (
    <div className="flex gap-10 justify-between items-start">
      <div className="flex-6">
        <CustomCard
          icon={<CircleAlert className="h-5 w-5" />}
          title={"REPORT OVERVIEW"}
        >
          <div className="flex gap-6 justify-evenly items-center">
            <div className="flex flex-col gap-2 justify-start items-center">
              <h3 className="text-muted-foreground text-xs">Status</h3>
              <Badge className={"text-yellow-700 bg-yellow-300"}>
                {report.data?.markReview}
              </Badge>
            </div>
            <div className="flex flex-col gap-2 justify-start items-center">
              <h3 className=" text-muted-foreground text-xs">Reporter</h3>
              <div className="flex gap-2 justify-center items-center text-sm">
                <Avatar className={"h-5 w-5"}>
                  <AvatarImage src={"https://placehold.co/600x400"} />
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
                {formatDateTime(report.data?.createdAt)}
              </p>
            </div>
          </div>
        </CustomCard>
        <CustomCard
          icon={<LinkIcon className="h-4 w-4 " />}
          title={"TARGET DETAIL"}
        >
          <div className="bg-muted flex gap-4 items-center rounded-lg mb-2">
            <LinkIcon className="w-14 h-14 shadow bg-card p-3 rounded-xl text-blue-700 ml-6" />

            <div className="bg-muted px-2 py-4">
              <h2 className="font-bold">{report.data?.link?.label}</h2>
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
                  <h3>{report.data?.reporter?.username}</h3>
                </div>
              </div>
            </div>
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
            {report.relatedData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-muted py-4 px-2 rounded mb-2 flex justify-between items-start gap-8"
                >
                  <div className="">
                    <h4 className="text-xs font-bold mb-1">{item.reason}</h4>
                    <div className="gap-1 text-xs italic flex justify-center items-center">
                      <Calendar className="inline w-3 h-3" />{" "}
                      <span>{formatDateTime(item.createdAt)}</span>
                    </div>
                  </div>
                  <Badge className="scale-80 font-bold" variant={"default"}>
                    {item.markReview}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CustomCard>
      </div>
    </div>
  );
}
