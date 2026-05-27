"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-border-faint bg-deep/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-[5%]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-[14px] tracking-[0.15em] text-gold sm:text-[16px] md:text-[18px]"
        >
          {SITE.name}
          <span className="hidden font-sans text-[10px] font-normal tracking-[0.3em] text-text-muted sm:block sm:text-[11px]">
            ✦ {SITE.tagline} ✦
          </span>
        </Link>

        <ul className="hidden gap-5 md:flex lg:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[12px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 sm:flex">
          {status !== "loading" && user ? (
            <>
              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="text-[11px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/account"
                className="text-[12px] tracking-[0.05em] text-gold"
              >
                {user.name ?? "Account"}
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="border border-border-faint px-4 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-gold hover:text-gold"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[11px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
              >
                Log In
              </Link>
              <Link
                href="/book"
                className="border border-gold bg-transparent px-4 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-deep md:px-5"
              >
                Book a Reading
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] text-gold md:hidden"
        >
          <span
            className={`block h-px w-6 bg-gold transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-gold transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-gold transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-border-faint bg-deep/98 px-[5%] py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[13px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <li>
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="block py-3 text-[13px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
                    >
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[13px] uppercase tracking-[0.15em] text-gold"
                  >
                    {user.name ?? "Account"}
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="block py-3 text-[13px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[13px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
                  >
                    Log In
                  </Link>
                </li>
                <li className="pt-3">
                  <Link
                    href="/book"
                    onClick={() => setOpen(false)}
                    className="inline-block border border-gold bg-transparent px-5 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-deep"
                  >
                    Book a Reading
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
