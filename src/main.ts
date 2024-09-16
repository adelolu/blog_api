import { Application, Request, Response, Router } from "express";
import route from "./routes";

export default function defaultRoutes(app: Application): void {
  // version 1
  const router = Router();
  route(router);
  app.use("/", router);

  // 404 Error Handler
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
      status: false,
      error: "Page not found",
    });
  });
}
