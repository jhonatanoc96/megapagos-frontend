'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { Button } from './button';

export function SignUpButton() {
  const handleSignUp = async () => {
    redirect('/sign-up');
  }
  return (
    <Button onClick={handleSignUp} className="mt-2 w-full bg-gray-500">
      Registrarse <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
