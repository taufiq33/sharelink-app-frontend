import { useNavigate, Outlet } from "react-router-dom";
import { getAccessToken } from "@/store";
import { useEffect } from "react";
import { requestNewAccessToken } from "@/features/auth/api";

import { useDispatch } from "react-redux";
import { saveAndDecodeAccessToken } from "@/features/auth/authCustomActions";

export default function ProtectedRoute() {
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

  return <Outlet />;
}
