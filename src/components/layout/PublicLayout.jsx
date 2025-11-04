import PublicFooter from "../public/PublicFooter";
import PublicHeader from "../public/PublicHeader";

export default function PublicLayout({ children }) {
  return (
    <div className="max-w-11/12 sm:max-w-10/12 md:max-w-9/12 mx-auto my-4">
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
}
