import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess, logout } from "../redux/authSlice";
import {
  authenticateWithBE,
  authenticateWithGoogle,
} from "../services/loginService";

export const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleData = await authenticateWithGoogle(
          tokenResponse.access_token
        );

        const userData = {
          email: googleData.email,
          name: googleData.name,
          picture: googleData.picture,
          sub: googleData.sub,
        };

        const apiData = await authenticateWithBE(userData);

        const { accessToken, refreshToken, id } = apiData.responseObject;
        const user = {
          id,
          ...userData,
        };
        dispatch(loginSuccess({ accessToken, refreshToken, user }));
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
    navigate("/");
  };

  return { signIn, signOut };
};
