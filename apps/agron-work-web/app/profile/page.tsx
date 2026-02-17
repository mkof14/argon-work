import { redirect } from "next/navigation";
import { readSession } from "../../lib/auth/session";
import { ProfileWorkspace } from "../../components/admin/ProfileWorkspace";

export default function ProfilePage() {
  const session = readSession();
  if (!session) redirect("/auth/login");

  return (
    <section>
      <p className="kicker">Profile</p>
      <h1 className="page-title">User Profile, Questionnaire, Resume</h1>
      <p className="page-subtitle">Manage your profile data, questionnaire answers, and full resume in one place.</p>
      <ProfileWorkspace />
    </section>
  );
}
