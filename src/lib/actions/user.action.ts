"use server";

import { connect } from "../db";
import User, { IUser } from "../modals/user.modal";

export async function createUser(user: IUser): Promise<IUser | null> {
  try {
    await connect();
    const newUser = await User.create(user);
    return newUser.toObject(); // Ensure the result is a plain JavaScript object
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}