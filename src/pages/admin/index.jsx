import UserRecentLinkTable from "@/components/dashboard/UserRecentLinkTable";
import UserStatisticCard from "@/components/dashboard/UserStatisticCard";
import { Pointer } from "lucide-react";
import { Link2 } from "lucide-react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { getUserRecentLinks, getUserStatistics } from "@/features/links/api";
import { Spinner } from "@/components/ui/spinner";

export default function AdminDashboard() {
  // const [statistics, setStatistics] = useState(null);

  // const [recentLinks, setRecentLinks] = useState(null);

  // useEffect(() => {
  //   async function getStatisticAndRecentLinks() {
  //     try {
  //       const [fetchStatistics, fetchRecentLinks] = await Promise.all([
  //         getUserStatistics(),
  //         getUserRecentLinks(),
  //       ]);

  //       setRecentLinks(fetchRecentLinks.data.links);
  //       setStatistics(fetchStatistics.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   getStatisticAndRecentLinks();
  // }, []);
  return <div className="flex flex-col gap-5">Admin Dashboard</div>;
}
