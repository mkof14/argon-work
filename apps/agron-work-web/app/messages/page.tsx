import { redirect } from "next/navigation";
import { readSession } from "../../lib/auth/session";
import { MessagingWorkspace } from "../../components/admin/MessagingWorkspace";

export default function MessagesPage() {
  const session = readSession();
  if (!session) redirect("/auth/login");

  return (
    <section>
      <p className="kicker">Communication</p>
      <h1 className="page-title">Messages</h1>
      <p className="page-subtitle">Send and track platform communications with users and support teams.</p>
      <MessagingWorkspace />
    </section>
  );
}
