'use client'

import { PowerIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';

export function Logout() {
  const handleLogout = async () => {
    process.env.NEXT_PUBLIC_TOKEN = '';
    process.env.NEXT_PUBLIC_USER = '';
    process.env.NEXT_PUBLIC_ROL = '';
    redirect('/login');
  }
  return (
    <button onClick={handleLogout} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
      <PowerIcon className="w-6" />
      <div className="cursor-pointer hidden md:block">Cerrar Sesión</div>
    </button>
  );
}
