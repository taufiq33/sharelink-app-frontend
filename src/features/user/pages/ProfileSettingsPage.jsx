import { useState, useEffect } from "react";
import PersonalInformationCard from "../components/PersonalInformationCard";
import { fetchMe } from "../api";

export default function ProfileSettingsPage() {
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
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <PersonalInformationCard user={user} />
    </div>
  );
}
