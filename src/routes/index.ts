import { Router } from "express";

import comment from "./comment";
import auth from "./auth";
import post from "./post";
import like from "./like";
import user from "./user";
import upload from "./upload";

export default (router: Router) => {
  auth(router);
  post(router);
  like(router);
  user(router);
  comment(router);
  upload(router);
};

// router.all("/");

// export default (app: Router) => app.use("/", router);
