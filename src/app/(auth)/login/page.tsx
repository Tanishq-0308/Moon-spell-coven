"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const res = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password.");
      setPending(false);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="border border-border-faint bg-purple-dark p-8">
      <h1 className="mb-2 text-center font-display text-[26px] tracking-[0.05em] text-gold">
        Welcome Back
      </h1>
      <p className="mb-8 text-center text-[13px] text-text-muted">
        Log in to your Moonspell account.
      </p>

      <form action={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base focus:border-gold focus:outline-none"
          />
        </div>

        {error && <p className="text-[13px] text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-gold py-3.5 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {pending ? "Logging in…" : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-text-muted">
        New here?{" "}
        <Link href="/signup" className="text-gold hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
