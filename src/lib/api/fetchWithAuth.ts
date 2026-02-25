export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  let res = await fetch(input, {
    ...init,
    credentials: 'include',
  });

  if (res.status !== 401) {
    return res;
  }

  const refreshRes = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!refreshRes.ok) {
    throw new Error('Unauthorized');
  }

  res = await fetch(input, {
    ...init,
    credentials: 'include',
  });

  return res;
}
