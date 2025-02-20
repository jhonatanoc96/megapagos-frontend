'use server'

import { redirect } from 'next/navigation';
import { SERVER_URL } from './constants/server-url.constant';

export async function sendHttpRequest(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  token: string,
  body?: any
) {
  const url = SERVER_URL + path;

  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const status = response.status;
  const data = response.json();

  if (status === 403) {
    process.env.NEXT_PUBLIC_TOKEN = '';
    process.env.NEXT_PUBLIC_USER = '';
    const msg = "No tienes permisos para acceder a esta página";
    redirect('/login?status=403&message=' + msg);
  }

  return data;
}