"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyAuthPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying secure AGRON sign-in...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const locale = params.get("locale") || "en";

    if (!token) {
      setStatus("Missing token. Please request a new magic link.");
      return;
    }

    fetch("/api/auth/verify-magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Verification failed");
        }
        setStatus("Success. Redirecting to your AGRON dashboard...");
        setTimeout(() => router.replace(`/${locale}/dashboard`), 500);
      })
      .catch(() => setStatus("Verification failed. Please request a new magic link."));
  }, [router]);

  return (
    <section>
      <span className="page-kicker">AGRON Secure Access</span>
      <h1 className="page-title">Auth Verification</h1>
      <div className="title-accent-line" />
      <article className="card">
        <p>{status}</p>
      </article>
    </section>
  );
}
