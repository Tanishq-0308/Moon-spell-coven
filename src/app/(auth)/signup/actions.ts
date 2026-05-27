"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export type SignupState = { error?: string } | undefined;

export async function signup(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.user.create({
    data: { name, email, passwordHash },
  });

  return undefined;
}
