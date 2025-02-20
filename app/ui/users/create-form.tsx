import Link from 'next/link';
import {
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/button';
import { createUser } from '@/app/lib/actions/users-actions';
import { Notification } from '@/app/ui/users/notification';

export default function Form() {
  return (
    <div>
      <Notification />
      <form action={createUser}>

        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Nombre
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ingrese el nombre"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Correo */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Correo
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ingrese el correo electrónico"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Contraseña
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingrese la contraseña"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="mb-4">
            <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium">
              Confirmar Contraseña
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirme la contraseña"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/users"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit">Crear Usuario</Button>
        </div>
      </form>
    </div>

  );
}
