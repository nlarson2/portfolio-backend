import { createClerkClient } from "@clerk/clerk-sdk-node";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export interface Authentication {
  IsAuthenticated: (jwt: string) => Promise<boolean>;
  IsAdmin: (jwt: string) => Promise<boolean>;
}

export interface MetaData {
  role: string;
}

const ClerkAuthentication: FastifyPluginAsync = async (
  instance: FastifyInstance,
) => {
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  const CheckIsAuthenticated = async (jwt: string): Promise<boolean> => {
    try {
      const userData = await clerkClient.verifyToken(jwt.split(" ")[1]);
      return userData != undefined;
    } catch (e: any) {
      console.error("Failed to authenticate: ", e);
    }
    return false;
  };

  const CheckIsAdmin = async (jwt: string): Promise<boolean> => {
    try {
      const userData = await clerkClient.verifyToken(jwt.split(" ")[1]);
      if (!userData) return false;
      const metaData: MetaData = userData.metadata as MetaData;
      return metaData && metaData.role === "admin";
    } catch (e: any) {
      console.log("Failed to authenticate: ", e.errors[0].meta);
    }
    return false;
  };

  const auth: Authentication = {
    IsAuthenticated: CheckIsAuthenticated,
    IsAdmin: CheckIsAdmin,
  };

  instance.decorate("auth", auth);
};

export default fp(ClerkAuthentication);
