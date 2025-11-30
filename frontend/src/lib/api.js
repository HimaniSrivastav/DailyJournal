export const API_BASE= process.env.NEXT_PUBLIC_API_URL;

export async function apiPost(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include", 
  })
  return res.json();
}

// This makes API calling easy in all pages
// Automatically includes credentials for cookie-based auth
  