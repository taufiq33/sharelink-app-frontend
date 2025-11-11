import { useDispatch } from "react-redux";
import { logout } from "../api";
import { authActions } from "../slices";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      dispatch(authActions.clearLoginData());
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  }

  return { handleLogout };
}

export default useLogout;
