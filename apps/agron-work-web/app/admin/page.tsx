import { redirect } from "next/navigation";
import { requireAdminUser } from "../../lib/admin/access";
import { AdminPanel } from "../../components/admin/AdminPanel";

export default async function AdminPage() {
  const admin = await requireAdminUser();
  if (!admin) redirect("/auth/login");

  return (
    <section>
      <p className="kicker">Administration</p>
      <h1 className="page-title">Admin Panel</h1>
      <p className="page-subtitle">Platform operations, marketing, templates, rights, analytics, finance, and monitoring.</p>
      <AdminPanel adminRole={admin.role} />
    </section>
  );
}
