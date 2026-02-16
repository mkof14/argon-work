import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell">
      <section className="card" style={{ marginTop: 20 }}>
        <h1 className="page-title">Page not found</h1>
        <p className="page-lead">The requested page does not exist.</p>
        <Link className="btn btn-secondary" href="/">
          Go home
        </Link>
      </section>
    </main>
  );
}
