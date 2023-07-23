import User from "../models/user.model.js";

export function addUser(body) {
  return new User(body).save();
}

export function getUser(query) {
  return User.findOne(query);
}

export function getUsers(query) {
  return User.find(query);
}

export function deleteUser(query) {
  return User.findOneAndRemove(query);
}

export function updateUser(query, body) {
  console.log(query, body);
  return User.findOneAndUpdate(query, body);
}
