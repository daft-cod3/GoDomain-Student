import { parseCookies, revokeSession, createSessionCookie } from "../../../../lib/auth.js";

export async function POST(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies.session;

  if (token) {
    await revokeSession(token);
  }

  const expiredCookie = `session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": expiredCookie,
    },
  });
}
