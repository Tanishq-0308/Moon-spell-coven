"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signup } from "./actions";

export default function SignupPage() {
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (prev: Awaited<ReturnType<typeof signup>>, formData: FormData) => {
      const result = await signup(prev, formData);
      // signup returns undefined on success — then log them straight in.
      if (!result) {
        setSigningIn(true);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (res?.error) {
          setSigningIn(false);
          return { error: "Account created, but sign-in failed. Try logging in." };
        }
        router.push("/");
        router.refresh();
      }
      return result;
    },
    undefined,
  );

  const busy = pending || signingIn;

  return (
    <div className="border border-border-faint bg-purple-dark p-8">
      <h1 className="mb-2 text-center font-display text-[26px] tracking-[0.05em] text-gold">
        Create Account
      </h1>
      <p className="mb-8 text-center text-[13px] text-text-muted">
        Begin your journey with Moonspell Coven.
      </p>

      <form action={formAction} className="space-y-5">
        <Field label="Full Name" name="name" type="text" />
        <Field label="Email" name="email" type="email" />
        <Field label="Password" name="password" type="password" />

        {state?.error && (
          <p className="text-[13px] text-red-400">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-gold py-3.5 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {busy ? "Creating…" : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-gold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base focus:border-gold focus:outline-none"
      />
    </div>
  );
}
