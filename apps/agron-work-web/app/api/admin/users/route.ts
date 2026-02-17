import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { listUsers, updateUserRole } from "../../../../lib/auth/users";
import { requireAdminUser, requireSuperAdminUser } from "../../../../lib/admin/access";
import type { Role } from "../../../../lib/platform/store";
import { readPlatformStore, writePlatformStore } from "../../../../lib/platform/store";

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = await listUsers();
  const store = await readPlatformStore();

  return NextResponse.json({
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })),
    invitations: store.roleInvitations,
    audit: store.roleAudit
  });
}

export async function POST(request: Request) {
  const admin = await requireSuperAdminUser();
  if (!admin) return NextResponse.json({ error: "Only super admin can invite roles" }, { status: 403 });

  const payload = await request.json().catch(() => null);
  const email = String(payload?.email ?? "").trim().toLowerCase();
  const role = String(payload?.role ?? "").trim() as Role;

  const allowedRoles: Role[] = ["user", "admin", "super_admin", "support_admin", "finance_admin", "marketing_admin", "moderator"];
  if (!email || !allowedRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid invite email or role" }, { status: 400 });
  }

  const store = await readPlatformStore();
  const createdAt = new Date().toISOString();

  const invitation = {
    id: randomUUID(),
    email,
    role,
    invitedBy: admin.email,
    status: "pending" as const,
    createdAt
  };

  store.roleInvitations.unshift(invitation);
  store.roleAudit.unshift({
    id: randomUUID(),
    actorEmail: admin.email,
    action: "INVITE_ROLE",
    targetEmail: email,
    role,
    createdAt
  });
  await writePlatformStore(store);

  return NextResponse.json({ ok: true, invitation });
}

export async function PATCH(request: Request) {
  const admin = await requireSuperAdminUser();
  if (!admin) return NextResponse.json({ error: "Only super admin can assign roles" }, { status: 403 });

  const payload = await request.json().catch(() => null);
  const userId = String(payload?.userId ?? "").trim();
  const role = String(payload?.role ?? "").trim() as Role;

  const allowedRoles: Role[] = ["user", "admin", "super_admin", "support_admin", "finance_admin", "marketing_admin", "moderator"];
  if (!userId || !allowedRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid userId or role" }, { status: 400 });
  }

  const updated = await updateUserRole(userId, role);

  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const store = await readPlatformStore();
  store.roleAudit.unshift({
    id: randomUUID(),
    actorEmail: admin.email,
    action: "ASSIGN_ROLE",
    targetEmail: updated.email,
    role,
    createdAt: new Date().toISOString()
  });
  await writePlatformStore(store);

  return NextResponse.json({ ok: true, user: updated, audit: store.roleAudit[0] });
}
