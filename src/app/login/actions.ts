'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const validPassword = process.env.ADMIN_PASSWORD || 'secret123';

  if (password === validPassword) {
    const cookieStore = await cookies();
    // Set a simple cookie, expires in 1 day
    cookieStore.set('auth_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    redirect('/dashboard');
  } else {
    return { error: 'Invalid password' };
  }
}
