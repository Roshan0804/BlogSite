import Category from "../models/category.model.js";

export function addCategory(body) {
  return new Category(body).save();
}

export function getCategory(query) {
  return Category.findOne(query);
}

export function getCategorys(query) {
  return Category.find(query);
}

export function deleteCategory(query) {
  return Category.findOneAndRemove(query);
}

export function updateCategory(query) {
  return Category.findOneAndUpdate(query);
}
