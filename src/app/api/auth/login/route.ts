import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'INVALID_CREDENTIALS', message: 'Invalid username or password' },
      { status: 401 }
    );
  }

  const data = await res.json();

  const response = NextResponse.json({
    user: {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    },
  });

  response.cookies.set('accessToken', data.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  response.cookies.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
