import { Repos } from "../middleware/db"; // Adjust import paths as needed
import { Authentication } from "../middleware/auth";

declare global {
  namespace Express {
    interface Request {
      db: Repos;
      auth: Authentication;
    }
  }
}
