import UserRecentLinkTable from "@/components/dashboard/UserRecentLinkTable";
import UserStatisticCard from "@/components/dashboard/UserStatisticCard";
import { Pointer } from "lucide-react";
import { Link2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserRecentLinks, getUserStatistics } from "@/features/links/api";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  const [statistics, setStatistics] = useState(null);

  const [recentLinks, setRecentLinks] = useState(null);

  useEffect(() => {
    async function getStatisticAndRecentLinks() {
      try {
        const [fetchStatistics, fetchRecentLinks] = await Promise.all([
          getUserStatistics(),
          getUserRecentLinks(),
        ]);

        setRecentLinks(fetchRecentLinks.data.links);
        setStatistics(fetchStatistics.data);
      } catch (error) {
        console.error(error);
      }
    }

    getStatisticAndRecentLinks();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      {statistics ? (
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <UserStatisticCard
            data={statistics.totalLink}
            title={"Total Links"}
            icon={<Link2 />}
          />
          <UserStatisticCard
            data={statistics.totalClick}
            title={"Total Clicks"}
            icon={<Pointer />}
          />
        </div>
      ) : (
        <Spinner />
      )}

      {recentLinks ? <UserRecentLinkTable data={recentLinks} /> : <Spinner />}
    </div>
  );
}
