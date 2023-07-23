import Blog from "../models/blog.model.js";

export function addBlog(body) {
  return new Blog(body).save();
}

export function getBlog(query) {
  return Blog.findOne(query).populate("author").populate("category");
}

export function getBlogs(query) {
  return Blog.find(query)
    .populate("author")
    .populate("category")
    .sort({ createdAt: -1 });
}

export function getLimitedBlogs(query, limit) {
  return Blog.find(query)
    .populate("author")
    .limit(limit || 10)
    .populate("category");
}

export function deleteBlog(query) {
  return Blog.findOneAndRemove(query);
}

export function updateBlog(query, body) {
  return Blog.findOneAndUpdate(query, body);
}
