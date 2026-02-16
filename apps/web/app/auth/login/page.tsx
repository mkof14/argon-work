"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "../../../components/AppProviders";
import { useAppSettings } from "../../../components/AppProviders";
import { BrandLogo } from "../../../components/BrandLogo";

export default function LoginPage() {
  const t = useTranslation();
  const { locale } = useAppSettings();
  const [errorCode, setErrorCode] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const errorText = useMemo(() => {
    const error = errorCode;
    if (!error) return "";
    if (error === "google_not_configured") return "Google Sign-In is not configured yet.";
    if (error === "google_token") return "Google auth failed while exchanging token.";
    if (error === "google_profile") return "Google auth failed while loading profile.";
    if (error === "google_state") return "Auth state is invalid. Please retry.";
    return "Authentication error. Please retry.";
  }, [errorCode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setErrorCode(params.get("error") ?? "");
    setMode(params.get("mode") === "signup" ? "signup" : "signin");
  }, []);

  async function onMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch("/api/auth/request-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale })
      });
      const payload = (await response.json()) as { magicLink?: string; error?: string };
      if (!response.ok) {
        setStatus(payload.error ?? "Failed to generate magic link.");
      } else {
        setStatus(`Magic link created. Preview: ${payload.magicLink}`);
      }
    } catch {
      setStatus("Unexpected error. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <span className="page-kicker">Secure Access</span>
      <h1 className="page-title">{mode === "signup" ? "Create AGRON Account" : t.login.title}</h1>
      <div className="title-accent-line" />
      <article className="card auth-card">
        <BrandLogo compact />
        <p>{mode === "signup" ? "Sign up with Magic Link or Google to start AGRON training." : t.login.info}</p>
        <form className="simple-form" onSubmit={onMagicLink}>
          <input
            className="input"
            type="email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Sending..." : mode === "signup" ? "Sign Up with Magic Link" : "Send Magic Link"}
          </button>
        </form>
        <a className="btn btn-secondary google-btn" href={`/api/auth/google/start?locale=${locale}`}>
          {mode === "signup" ? "Sign Up with Google" : "Continue with Google"}
        </a>
        <div className="auth-chip-wrap">
          <a className="auth-chip" href={`/${locale}/auth/login?mode=signin`}>Sign In</a>
          <a className="auth-chip" href={`/${locale}/auth/login?mode=signup`}>Sign Up</a>
        </div>
        {errorText ? <p className="auth-error">{errorText}</p> : null}
        {status ? <p className="auth-status">{status}</p> : null}
      </article>
    </section>
  );
}
