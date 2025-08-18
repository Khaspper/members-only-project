import "express-session";

declare module "express-session" {
  interface SessionData {
    viewCount: number;
  }
}

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      hash: string;
    }
  }
}
