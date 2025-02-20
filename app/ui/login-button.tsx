'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { Button } from './button';

export function LoginButton() {
  const handleLogin = async () => {
    redirect('/login');
  }
  return (
    <Button onClick={handleLogin} className="mt-2 w-full bg-gray-500">
      Iniciar Sesión <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
