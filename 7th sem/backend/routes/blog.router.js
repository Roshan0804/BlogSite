import multer from "multer";
import {
  listBlogs,
  postBlog,
  removeBlog,
  singleBlog,
  enableDisableBlog,
  modifyBlog,
  postEnquiry,
  listEnquiry,
  searchBlogs,
} from "../controllers/blog.controller.js";
import checkAuthHeader from "../middleware/auth.js";

var storage = multer.diskStorage({
  destination: "./public/",
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".png");
  },
});

const upload = multer({ storage: storage });

export function BlogRouter(router) {
  router.post("/blog", upload.single("file"), checkAuthHeader, postBlog);
  router.post("/blog/:id", upload.single("file"), checkAuthHeader, modifyBlog);
  router.get("/blogs", listBlogs);
  router.delete("/blog/:id", checkAuthHeader, removeBlog);
  router.patch("/enable-disable-blog/:id", checkAuthHeader, enableDisableBlog);
  router.get("/blog/:id", singleBlog);
  router.post("/enquiry", postEnquiry);
  router.get("/enquirys", checkAuthHeader, listEnquiry);
  router.get("/search", searchBlogs);
}
