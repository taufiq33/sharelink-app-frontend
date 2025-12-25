import { useNavigate, Outlet } from "react-router-dom";
import { getAccessToken } from "@/store";
import { useEffect } from "react";
import { requestNewAccessToken } from "@/features/auth/api";

import { useDispatch } from "react-redux";
import { saveAndDecodeAccessToken } from "@/features/auth/authCustomActions";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ admin = false }) {
  const userIsAdmin = useSelector((state) => state.auth.role) === "admin";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!getAccessToken()) {
      handleAccessTokenNull();
    }

    async function handleAccessTokenNull() {
      try {
        const newAccessToken = await requestNewAccessToken();
        dispatch(saveAndDecodeAccessToken(newAccessToken));
      } catch (error) {
        console.error(error);
        navigate("/auth");
      }
    }
  }, [navigate, dispatch]);

  if (admin && !userIsAdmin) navigate("/dashboard");
  return <Outlet />;
}
