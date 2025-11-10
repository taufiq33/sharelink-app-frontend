import PublicFooter from "../public/PublicFooter";
import PublicHeader from "../public/PublicHeader";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="max-w-11/12 sm:max-w-10/12 md:max-w-9/12 mx-auto my-4">
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </div>
  );
}
