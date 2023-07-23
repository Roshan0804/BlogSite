import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password) {
  return hash(password, 10);
}

export async function comparePassword(pass, hashVal) {
  return compare(pass, hashVal);
}

export function generateToken(data) {
  return jwt.sign(
    {
      data: data,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}
