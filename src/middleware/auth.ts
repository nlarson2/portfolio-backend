import { createClerkClient } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export interface Authentication {
  IsAuthenticated: (jwt: string) => Promise<boolean>;
  IsAdmin: (jwt: string) => Promise<boolean>;
}

export interface MetaData {
  role: string;
}

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const CheckIsAuthenticated = async (jwt: string): Promise<boolean> => {
  try {
    const userData = await clerkClient.verifyToken(jwt.split(" ")[1], {
      jwtKey: process.env.CLERK_JWT_KEY,
    });
    return userData != undefined;
  } catch (e: any) {
    console.log(`Failed to authenticate:\nToken: ${jwt}\nError: ${e}`);
  }
  return false;
};

export const CheckIsAdmin = async (jwt: string): Promise<boolean> => {
  try {
    const userData = await clerkClient.verifyToken(jwt.split(" ")[1], {
      jwtKey: process.env.CLERK_JWT_KEY,
    });
    if (!userData) return false;
    const metaData: MetaData = userData.metadata as MetaData;
    return metaData && metaData.role === "admin";
  } catch (e: any) {
    console.log(
      `Failed to authenticate:\nToken: ${jwt}\nError: ${e.errors[0].meta}`,
    );
  }
  return false;
};

export default function auth(req: Request, res: Response, next: NextFunction) {
  const authentication: Authentication = {
    IsAuthenticated: CheckIsAuthenticated,
    IsAdmin: CheckIsAdmin,
  };

  req.auth = authentication;
  next();
}
