import { BlogRouter } from "./blog.router.js";
import UserRouter from "./user.router.js";

export default function ConfigRouter(router) {
  UserRouter(router);
  BlogRouter(router);
}
