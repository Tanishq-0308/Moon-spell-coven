"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function submitBooking(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string;
  const dob = formData.get("dob") as string;
  const tob = formData.get("tob") as string;
  const pob = formData.get("pob") as string;
  const question = formData.get("question") as string | null;

  if (!name || !email || !phone || !service || !dob || !tob || !pob) {
    throw new Error("Please fill in all required fields.");
  }

  await db.booking.create({
    data: { name, email, phone, service, dob, tob, pob, question: question || null },
  });

  redirect("/book/confirmed");
}
