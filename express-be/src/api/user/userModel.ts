import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  accessToken: z.string(),
  accessTokenExpireTime: z.string(),
  refreshToken: z.string(),
  refreshTokenExpireTime: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
// export const GetUserSchema = z.object({
//   params: z.object({ id: commonValidations.id }),
// });

export const SignupSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    profilePicture: z.string().optional(),
    sub: z.string().optional(),
  }),
});
