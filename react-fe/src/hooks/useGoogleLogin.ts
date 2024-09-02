import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import { loginSuccess, logout } from "../redux/authSlice";
import {
  authenticateWithBE,
  authenticateWithGoogle,
} from "../services/loginService";

export const useGoogleAuth = () => {
  const dispatch = useDispatch();

  const signIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleData = await authenticateWithGoogle(
          tokenResponse.access_token
        );

        const apiData = await authenticateWithBE({
          email: googleData.email,
          name: googleData.name,
          picture: googleData.picture,
          sub: googleData.sub,
        });

        const { accessToken, refreshToken } = apiData.responseObject;
        dispatch(loginSuccess({ accessToken, refreshToken }));
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const signOut = () => {
    dispatch(logout());
  };

  return { signIn, signOut };
};
