import { findUserByEmail } from "../auth/users";
import { readSession } from "../auth/session";

export async function requireAuthUser() {
  const session = readSession();
  if (!session) return null;
  return findUserByEmail(session.email);
}

export async function requireAdminUser() {
  const user = await requireAuthUser();
  if (!user) return null;
  if (["admin", "super_admin", "support_admin", "finance_admin", "marketing_admin", "moderator"].includes(user.role)) return user;
  return null;
}

export async function requireSuperAdminUser() {
  const user = await requireAuthUser();
  if (!user) return null;
  if (user.role === "super_admin") return user;
  return null;
}
