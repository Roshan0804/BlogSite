import {
  createUser,
  modifyUser,
  removeUser,
  loginUser,
  listUsers,
  changePassword,
  userEnableDisable,
  getAuthors,
} from "../controllers/user.controller.js";
import checkAuthHeader from "../middleware/auth.js";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../controllers/category.controller.js";

export default function UserRouter(router) {
  /**
   * @swagger
   * /api/user/login:
   *  post:
   *    tags: ['Authentication']
   *    summary: This is the user authenticate api
   *    description: Use to authenticate user
   *    responses:
   *        '200':
   *           description: A successful response
   *        '404':
   *           description: Not found
   *        '403':
   *           description: Internal server errors
   */
  router.post("/user/login", loginUser);
  router.get("/user", checkAuthHeader, listUsers);
  router.get("/users", getAuthors);
  router.post("/user/signup", createUser);
  router.patch("/user/:userid", checkAuthHeader, modifyUser);
  router.patch(
    "/enable-disable-user/:userid",
    checkAuthHeader,
    userEnableDisable
  );
  router.patch("/change-password", checkAuthHeader, changePassword);
  router.delete("/user/:userid", checkAuthHeader, removeUser);

  // category
  router.post("/category", checkAuthHeader, createCategory);
  router.get("/category", listCategory);
  router.delete("/category/:id", checkAuthHeader, removeCategory);
}
