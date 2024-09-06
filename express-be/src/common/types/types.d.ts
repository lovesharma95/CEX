// types.d.ts or a similar name
import { JwtPayload } from "jsonwebtoken"; // Assuming you use jwt-payload or similar

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string | Payload; // Add the type for the user object
    }
  }
}
