import jwt from "jsonwebtoken";

import { env } from "@/common/utils/envConfig";

type Payload = {
  _id: string;
};

export class JwtManager {
  public async generateTokens(payload: Payload) {
    try {
      const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_PRIVATE_KEY, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: "30d",
      });

      return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async verifyAccessToken(accessToken: string) {
    const privateKey = env.ACCESS_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
      jwt.verify(accessToken, privateKey, (err, tokenDetails) => {
        if (err)
          return reject({ error: true, message: "Invalid access token" });
        resolve({
          tokenDetails,
          error: false,
          message: "Valid access token",
        });
      });
    });
  }

  public async verifyRefreshToken(refreshToken: string) {
    const privateKey = env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err)
          return reject({ error: true, message: "Invalid refresh token" });
        resolve({
          tokenDetails,
          error: false,
          message: "Valid refresh token",
        });
      });
    });
  }
}
