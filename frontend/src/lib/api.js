export const API_BASE= process.env.NEXT_PUBLIC_API_URL;

export async function apiPost(path, data) {
  const res = await fetch(`${API_BASE}${path}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    Credentials: "include",
  });
  return res.json();
}
