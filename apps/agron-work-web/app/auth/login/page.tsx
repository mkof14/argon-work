import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "../../../components/auth/AuthForm";
import { QuickAdminButton } from "../../../components/auth/QuickAdminButton";

export default function LoginPage() {
  return (
    <section className="auth-page">
      <p className="kicker">Authentication</p>
      <h1 className="page-title">Login / Register</h1>
      <p className="page-subtitle">
        Full account access for specialists and employers, including email/password and Google sign-in.
      </p>
      <div className="row">
        <QuickAdminButton />
        <Link href="/auth/login?mode=register" className="btn ghost">Create regular account</Link>
      </div>
      <Suspense fallback={<p className="page-subtitle">Loading auth form...</p>}>
        <AuthForm />
      </Suspense>
    </section>
  );
}
