import { createFileRoute } from "@tanstack/react-router";

// One-shot seed endpoint — safe to call multiple times (idempotent).
// After confirming admins exist, this file can be deleted.
const ADMINS = [
  { email: "admin@pantaijolosutro.id", password: "Jolosutro#2026" },
  { email: "konten1@pantaijolosutro.id", password: "Jolosutro#2026" },
  { email: "konten2@pantaijolosutro.id", password: "Jolosutro#2026" },
];

export const Route = createFileRoute("/api/public/seed-admins")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const results: Array<{ email: string; status: string; user_id?: string }> = [];

        for (const admin of ADMINS) {
          // Try to create; if already exists, look up by list.
          const { data: created, error: createErr } =
            await supabaseAdmin.auth.admin.createUser({
              email: admin.email,
              password: admin.password,
              email_confirm: true,
            });

          let userId: string | undefined = created?.user?.id;

          if (createErr && !userId) {
            // Fallback: find existing user by email
            const { data: list } = await supabaseAdmin.auth.admin.listUsers({
              page: 1,
              perPage: 200,
            });
            const found = list?.users?.find((u) => u.email === admin.email);
            userId = found?.id;
          }

          if (!userId) {
            results.push({ email: admin.email, status: "failed: " + (createErr?.message ?? "unknown") });
            continue;
          }

          // Upsert role
          const { error: roleErr } = await supabaseAdmin
            .from("user_roles")
            .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

          results.push({
            email: admin.email,
            status: roleErr ? "user ok, role failed: " + roleErr.message : "ok",
            user_id: userId,
          });
        }

        return Response.json({ results });
      },
    },
  },
});
