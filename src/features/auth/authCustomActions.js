import { authActions } from "./slices";
import { jwtDecode } from "jwt-decode";

export function saveAndDecodeAccessToken(accToken) {
  return async function (dispatch) {
    const user = jwtDecode(accToken);
    dispatch(
      authActions.saveLoginData({
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        accessToken: accToken,
      })
    );
  };
}
