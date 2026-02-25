import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({}, { status: 401 });
  }

  const res = await fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    return NextResponse.json({}, { status: 401 });
  }

  const data = await res.json();

  const response = NextResponse.json({ ok: true });

  response.cookies.set('accessToken', data.accessToken, {
    httpOnly: true,
    path: '/',
  });

  response.cookies.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    path: '/',
  });

  return response;
}
